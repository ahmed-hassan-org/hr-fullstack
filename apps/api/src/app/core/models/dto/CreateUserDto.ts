import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  // @ApiProperty()
  user_id: number;
  @IsNotEmpty({ message: 'username is required' })
  @ApiProperty()
  username: string;
  @IsNotEmpty({ message: 'email is required' })
  @IsEmail({}, { message: 'pleases enter a valid email address' })
  @ApiProperty()
  email: string;
  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a valid string' })
  @ApiProperty()
  password: string;
  @IsOptional({ message: 'optional field' })
  // @ApiProperty()
  is_active: boolean;
  @IsOptional({ message: 'optional field' })
  // @ApiProperty()
  is_blocked: boolean;
  @IsOptional({ message: 'optional field' })
  // @ApiProperty()
  isOtpEnabled: boolean;
  // @ApiProperty()
  twoFactorAuthenticationSecret: string;
}
