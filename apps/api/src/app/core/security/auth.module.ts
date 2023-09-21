import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HashService } from './hash.service';
import { PrismaModule } from '../../db/prisma-module/prisma.module';
import { UsersModule } from '../../modules/users/users.module';
import { UsersService } from '../../modules/users/users.service';
import { RefreshTokenService } from './refreshtoken.service';
import { AccessToeknJwtService } from './accesstoeknjwt.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      session: false,
    }),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    HashService,
    UsersService,
    RefreshTokenService,
    AccessToeknJwtService,
  ],
  exports: [AuthService, JwtService, HashService],
})
export class AuthModule {}
