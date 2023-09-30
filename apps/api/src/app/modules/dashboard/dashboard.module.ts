import { DashboardController } from './dashboard.controller';
import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { PrismaModule } from '../../db/prisma-module/prisma.module';
import { AuthModule } from '../../core/security/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
