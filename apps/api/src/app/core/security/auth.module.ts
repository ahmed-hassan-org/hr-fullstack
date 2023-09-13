import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { PrismaModule } from '../../db/prisma-module/prisma.module';
import { UsersModule } from '../../modules/users/users.module';
import { UsersService } from '../../modules/users/users.service';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, HashService, UsersService],
  exports: [AuthService, JwtService, HashService],
})
export class AuthModule {}
