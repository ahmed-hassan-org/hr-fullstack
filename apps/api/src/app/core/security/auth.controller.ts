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

@Controller('/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private hashService: HashService
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
      console.log(isUserExists);

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
  async isTwoFactorAuthenticationCodeValid(@Body() otpDto: any) {
    const user = await this.usersService.findUserByEmail(otpDto.email);
    return authenticator.verify({
      token: otpDto.twoFactorAuthenticationCode,
      secret: user.twoFactorAuthenticationSecret,
    });
  }

  // async generateQrCodeDataURL(otpAuthUrl: string) {
  //   return toDataURL(otpAuthUrl);
  // }

  @Post('/trun-otp-on-off/:email/:state')
  async turnOnTwoFactorAuthentication(
    @Param('email') email: string,
    @Param('state') state: boolean
  ) {
    try {
      const res = await this.usersService.enableDisableOtp(email, state);
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
