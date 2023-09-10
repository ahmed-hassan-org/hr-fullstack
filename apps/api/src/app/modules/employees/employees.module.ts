import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { Module } from '@nestjs/common';
import { SharedDBModule } from '../../db/shareddb.module';

@Module({
  imports: [SharedDBModule],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
