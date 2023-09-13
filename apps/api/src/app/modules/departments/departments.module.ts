import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma-module/prisma.module';
import { AuthModule } from '../../core/security/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
