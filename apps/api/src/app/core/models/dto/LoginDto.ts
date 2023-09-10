import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @IsString({ message: 'must be string' })
  email: string;
  @IsString({ message: 'must be string' })
  password: string;
}
