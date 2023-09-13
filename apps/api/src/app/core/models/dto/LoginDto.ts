import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'please enter your email' })
  @IsString({ message: 'must be string' })
  @IsEmail({}, { message: 'please enter a valid email address' })
  email: string;
  @ApiProperty()
  @IsString({ message: 'must be string' })
  @IsNotEmpty({ message: 'please enter your password' })
  password: string;
}
