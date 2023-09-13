import {
  Controller,
  Get,
  HttpStatus,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { HrResponse } from '../../core/models/classes/HrResponse';

@Controller('/users')
@ApiTags('Users')
export class UsersController {
  constructor(private userServicce: UsersService) {}

  // @Post('/register')
  // async createUser(@Body() data: CreateUserDto) {
  //   try {
  //     const user = await this.userServicce.findUserByEmail(data.email);
  //     if (user) {
  //       return new HrResponse(null, 'user already exists', HttpStatus.OK, []);
  //     } else {
  //       const res = await this.userServicce.createUser(data);
  //       return new HrResponse(res, 'user created', HttpStatus.CREATED, []);
  //     }
  //   } catch (error) {
  //     return new HrResponse(
  //       null,
  //       'cannot create user',
  //       HttpStatus.BAD_REQUEST,
  //       []
  //     );
  //   }
  // }

  @Get('/getUser/:email')
  async getOneUser(@Param('email') email: string) {
    try {
      const res = await this.userServicce.findUserByEmail(email);
      if (res) {
        return new HrResponse(res, 'found', HttpStatus.OK, []);
      } else {
        return new HrResponse(
          null,
          'no user with this data',
          HttpStatus.NOT_FOUND,
          []
        );
      }
    } catch (error) {
      return new HrResponse(
        null,
        'user with this email not found',
        HttpStatus.NOT_FOUND,
        ['user with this email not found']
      );
    }
  }
}
