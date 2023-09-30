import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { authenticator } from 'otplib';
import { UsersService } from '../../modules/users/users.service';
import { HrErrorresponse } from '../models/classes/HrErrorResponse';
import { HrResponse } from '../models/classes/HrResponse';
import { CreateUserDto } from '../models/dto/CreateUserDto';
import { LoginDto } from '../models/dto/LoginDto';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { PrismaService } from '../../db/prisma-module/prisma.service';
import { VerifyOtpDto } from '../models/dto/VerifyOtpDto';

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private hashService: HashService,
    private prismaService: PrismaService
  ) {}

  @Post('/login')
  async login(@Body() loginData: LoginDto) {
    try {
      const res = await this.authService.doLogin(loginData);
      return new HrResponse(res, 'logged in success', HttpStatus.OK, []);
    } catch (error) {
      throw new HrErrorresponse('enter valid data', HttpStatus.NOT_ACCEPTABLE, [
        error.message,
      ]);
    }
  }

  @Post('/register')
  async createUser(@Body() user: CreateUserDto) {
    try {
      const isUserExists = await this.usersService.findUserByEmail(user.email);

      if (isUserExists) {
        throw new HrErrorresponse(
          'user already exists, please change email',
          HttpStatus.BAD_REQUEST,
          ['user already exists, please change email']
        );
      }
      const userData = {
        ...user,
        password: await this.hashService.hashPassword(user.password),
      };
      const { password, twoFactorAuthenticationSecret, ...res } =
        await this.usersService.createUser(userData);
      if (res) {
        return new HrResponse(res, 'user created', HttpStatus.OK);
      }
    } catch (error) {
      throw new HrErrorresponse(
        'cannot create user right now',
        HttpStatus.BAD_REQUEST,
        [error]
      );
    }
  }

  //   forgotPassword(email: string) {
  //     return {};
  //   }

  //   changePassword(newPassword: string, repeatPassword: string) {}

  @Post('/verify-2fa-otp')
  async isTwoFactorAuthenticationCodeValid(@Body() otpDto: VerifyOtpDto) {
    const user = await this.usersService.findUserByEmail(otpDto.email);

    const isVerify = authenticator.verify({
      token: otpDto.twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
    if (isVerify) {
      const res = await this.prismaService.users_log.create({
        data: {
          email: otpDto.email,
          verify_otp_code: otpDto.twoFactorAuthenticationCode,
          login_verify_date: new Date(),
          is_otp_verify: isVerify,
        },
      });
      return isVerify;
    }
    return isVerify;
  }

  @Post('/signout/:email')
  async singoutUser(@Param('email') email: string) {
    try {
      const isExists = await this.prismaService.users_log.findFirst({
        where: { email: email, is_logged_out: false },
      });
      if (isExists) {
        const res = await this.prismaService.users_log.update({
          where: { log_id: isExists.log_id, email: email },
          data: {
            is_logged_out: true,
            logout_verify_date: new Date(),
          },
        });
        return new HrResponse(null, 'user logged out success', HttpStatus.OK);
      }

      if (!isExists) {
        throw new HrErrorresponse(
          'user not found',
          HttpStatus.NOT_FOUND,
          'we cannot found user with this email'
        );
      }
    } catch (error) {
      throw new HrErrorresponse(
        'cannot logout user',
        HttpStatus.BAD_REQUEST,
        []
      );
    }
  }

  /**
   * @description
   * this api used to generate recovery OTP is the user lost his phone
   * this way allow userto login again t the app
   * and you must reset the qrcode secret
   */
  @Post('/generate-recovery-key/:email')
  async generateRecoveryKey(@Param('email') email: string) {
    try {
      const logData = await this.prismaService.users_log.findFirst({
        where: { email: email },
      });
      const isResetSecret = await this.prismaService.users.update({
        where: { email: email },
        data: {
          twoFactorAuthenticationSecret: '',
        },
      });
      // const isLogReset = await this.prismaService.users_log.update({
      //   where: { log_id: logData.log_id, email: email },
      //   data: {
      //     login_verify_date: new Date(),
      //     logout_verify_date: new Date(),
      //     verify_otp_code: '',
      //     email: email,
      //   },
      // });
      const recoveryKey = this.authService.generateToken();
      return new HrResponse(
        recoveryKey,
        'recovery keygenerated',
        HttpStatus.OK
      );
    } catch (error) {
      throw new HrErrorresponse('error.message', HttpStatus.BAD_REQUEST, []);
    }
  }

  @Post('/trun-otp-on-off/:email/:state')
  async turnOnTwoFactorAuthentication(
    @Param('email') email: string,
    @Param('state') state: boolean
  ) {
    try {
      const isEmailExist = await this.usersService.findUserByEmail(email);
      if (!isEmailExist) {
        throw new HrErrorresponse(
          'user not exists, please enter a valid email',
          HttpStatus.NOT_FOUND,
          []
        );
      }
      const res = await this.usersService.enableDisableOtp(email, state);
      if (!state) {
        return new HrResponse(res, '2fa disabled', HttpStatus.OK);
      }
      return new HrResponse(res, '2fa enabled', HttpStatus.OK);
    } catch (error) {
      throw new HrErrorresponse(
        'cannot enable 2fa right now',
        HttpStatus.NOT_ACCEPTABLE,
        [error]
      );
    }
  }
}
