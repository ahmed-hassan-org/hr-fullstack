import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma-module/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
