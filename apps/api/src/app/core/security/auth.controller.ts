import { Body, Controller, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from '../../modules/users/users.service';
import { AuthService } from './auth.service';
import { HashService } from './hash.service';
import { HrResponse } from '../models/classes/HrResponse';
import { authenticator } from 'otplib';
import { LoginDto } from '../models/dto/LoginDto';
import { CreateUserDto } from '../models/dto/CreateUserDto';

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
      const res = await this.authService.validateLogin(loginData);
      return new HrResponse(res, 'logged in success', HttpStatus.OK, []);
    } catch (error) {
      return new HrResponse(null, 'enter valid data', HttpStatus.BAD_REQUEST, [
        error.response.message,
      ]);
    }
  }

  @Post('/register')
  async createUser(@Body() user: CreateUserDto) {
    try {
      const userData = {
        ...user,
        password: await this.hashService.hashPassword(user.password),
      };
      const { password, twoFactorAuthenticationSecret, ...res } =
        await this.usersService.createUser(userData);
      if (res) {
        return new HrResponse(res, 'created', HttpStatus.OK);
      }
    } catch (error) {
      return new HrResponse(null, 'faild', HttpStatus.BAD_REQUEST, error);
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
    return this.usersService.enableDisableOtp(email, state);
  }
}
