import { Module } from '@nestjs/common';
import { PrismaModule } from '../../db/prisma-module/prisma.module';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { AuthModule } from '../../core/security/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
