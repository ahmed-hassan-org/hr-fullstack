import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../models/dto/LoginDto';
import { HashService } from './hash.service';
import { authenticator } from 'otplib';
import { PrismaService } from '../../db/prisma-module/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: PrismaService,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}
  async validateLogin(logData: LoginDto) {
    const user = await this.usersService.users.findFirst({
      where: { email: logData.email },
    });

    if (!user.user_id) {
      throw new NotAcceptableException({ message: 'user not found' });
    }
    const validatePassword = await this.hashService.comparePassword(
      logData.password,
      user.password
    );

    if (!validatePassword) {
      throw new NotAcceptableException({
        message: 'please enter valid password for your email',
      });
    }

    if (user.isOtpEnabled) {
      const otpData = await this.generateTwoFactorAuthenticationSecret(user);
      return {
        token: this.jwtService.sign(
          {
            email: user.email,
            username: user.username,
          },
          { secret: process.env.JWT_SECRET, algorithm: 'HS512' }
        ),
        ...otpData,
      };
    } else {
      try {
        const token = this.jwtService.sign(
          {
            email: user.email,
            username: user.username,
          },
          { secret: process.env.JWT_SECRET, algorithm: 'HS512' }
        );
        const otpData = {
          token: token,
        };
        return otpData;
      } catch (error) {
        return error;
      }
    }
  }

  async generateTwoFactorAuthenticationSecret(user: any) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.username, 'Hr App', secret);
    await this.usersService.users.update({
      where: { user_id: user.userId },
      data: { twoFactorAuthenticationSecret: secret },
    });

    return {
      secret,
      otpauthUrl,
    };
  }
}
