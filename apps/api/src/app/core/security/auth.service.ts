import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../models/dto/LoginDto';
import { UsersService } from '../../modules/users/users.service';
import { HashService } from './hash.service';
import { authenticator } from 'otplib';
import { Users } from '../../db/entities/Users';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService
  ) {}
  async validate(logData: LoginDto) {
    const user = await this.usersService.findUserByEmail(logData.email);

    if (!user) {
      throw new NotAcceptableException({ message: 'email not found' });
    }
    const validatePassword = await this.hashService.comparePassword(
      logData.password,
      user.password
    );

    if (!validatePassword) {
      throw new NotAcceptableException({
        message: 'pleaase enter valid email password',
      });
    }
    const { ...result } = user;
    const otpData = await this.generateTwoFactorAuthenticationSecret(user);
    return {
      token: this.jwtService.sign(
        {
          email: result.email,
          username: result.username,
        },
        { secret: process.env.JWT_SECRET, algorithm: 'HS512' }
      ),
      ...otpData,
    };
  }

  async generateTwoFactorAuthenticationSecret(user: Users) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.username, 'Hr App', secret);
    await this.usersService.setTwoFactorAuthenticationSecret(
      secret,
      user.userId
    );

    return {
      secret,
      otpauthUrl,
    };
  }
}
