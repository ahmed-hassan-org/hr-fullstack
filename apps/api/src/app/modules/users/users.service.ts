import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../../db/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private usersRepo: Repository<Users>) {}
  getAllUsers() {
    return this.usersRepo.find();
  }

  findUserByEmail(email: string) {
    return this.usersRepo.findOneBy({ email: email });
  }

  findUserById(userId: number) {
    return this.usersRepo.findOneBy({ userId: userId });
  }

  createUser(userData: Users) {
    return this.usersRepo.save(userData);
  }

  async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
    return this.usersRepo.update(
      { userId: userId },
      { twoFactorAuthenticationSecret: secret }
    );
  }

  enableDisableOtp(email: string, state: true | false) {
    return this.usersRepo.update({ email: email }, { isOtpEnabled: state });
  }
}
