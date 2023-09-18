import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma-module/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SettingsController],
  providers: [SettingsService],
})
export class SettingsModule {}
