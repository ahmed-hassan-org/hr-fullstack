import { UsersService } from './users.service';
import { UsersController } from './users.controller';

import { Module } from '@nestjs/common';
import { SharedDBModule } from '../../db/shareddb.module';

@Module({
  imports: [SharedDBModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
