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

  async doLogin(logData: LoginDto) {
    let user = null;
    let roles = null;
    try {
      user = await this.usersService.users.findFirstOrThrow({
        where: { email: logData.email },
      });
      roles = await this.usersService
        .$queryRaw`select role_name from roles where role_id in (select role_id from user_Roles where user_id = ${user.user_id})`;
      roles = roles.map((ele) => ele.role_name).toString();
      console.log(roles);
    } catch (error) {
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
        token: await this.jwtService.sign(
          {
            email: user.email,
            username: user.username,
            roles: roles,
          },
          {
            secret: 'secret',
            expiresIn: '5m',
          }
        ),
        roles: roles,
        ...otpData,
      };
    } else {
      try {
        const token = this.jwtService.sign(
          {
            email: user.email,
            username: user.username,
            roles: roles,
          },
          { secret: 'secret', expiresIn: '10m' }
        );
        const otpData = {
          token: token,
          roles: roles,
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
