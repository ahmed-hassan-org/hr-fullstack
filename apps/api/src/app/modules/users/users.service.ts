import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma-module/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  getAllUsers() {
    return this.prisma.users.findMany();
  }

  findUserByEmail(email: string) {
    return this.prisma.users.findFirst({ where: { email: email } });
  }

  findUserById(userId: number) {
    return this.prisma.users.findFirst({ where: { user_id: userId } });
  }

  createUser(userData: any) {
    return this.prisma.users.create({ data: { ...userData } });
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.prisma.users.update({
      where: { user_id: userId },
      data: { twoFactorAuthenticationSecret: secret },
    });
  }

  enableDisableOtp(email: string, state: boolean) {
    // disabled state
    if (!state) {
      return this.prisma.users.update({
        where: { email: email },
        data: { isOtpEnabled: state, twoFactorAuthenticationSecret: '' },
        select: { email: true, isOtpEnabled: true },
      });
    }
    // enable state
    return this.prisma.users.update({
      where: { email: email },
      data: { isOtpEnabled: state },
      select: { email: true, isOtpEnabled: true },
    });
  }
}
