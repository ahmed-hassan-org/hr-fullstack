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

    if (user && user.isOtpEnabled && !user.twoFactorAuthenticationSecret) {
      try {
        const otpData = await this.generateTwoFactorAuthenticationSecret(user);
        const token = await this.jwtService.sign(
          {
            email: user.email,
            username: user.username,
            roles: roles,
          },
          {
            secret: 'secret',
            expiresIn: '5m',
          }
        );
        return {
          token: token,
          roles: roles,
          isOtpEnabled: true,
          ...otpData,
        };
      } catch (error) {
        console.log(error);
        return error;
      }
    }

    if (user && user.isOtpEnabled && user.twoFactorAuthenticationSecret) {
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
          isOtpEnabled: true,
        };
        return otpData;
      } catch (error) {
        return error;
      }
    }

    if (user && !user.isOtpEnabled && !user.twoFactorAuthenticationSecret) {
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
          isOtpEnabled: false,
        };
        return otpData;
      } catch (error) {
        return error;
      }
    }
  }

  async generateTwoFactorAuthenticationSecret(user: any) {
    const secret = authenticator.generateSecret();
    const otpauthUrl = authenticator.keyuri(user.email, 'Hr App', secret);
    await this.usersService.users.update({
      where: { email: user.email },
      data: { twoFactorAuthenticationSecret: secret },
    });

    return {
      secret,
      otpauthUrl,
    };
  }

  generateToken() {
    const data = '0062510-01-19420531';
    const actualDate = new Date().getTime();

    authenticator.options = {
      digits: 10,
      step: 5,
      epoch: actualDate,
    };
    const secret = authenticator.encode(data);
    const newToken = authenticator.generate(secret);
    return newToken;
  }
}
