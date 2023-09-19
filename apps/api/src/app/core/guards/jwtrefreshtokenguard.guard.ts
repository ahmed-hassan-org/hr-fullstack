import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtrefreshTokenGuardGuard extends AuthGuard('jwt-refresh') {}
