import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule],
  exports: [EmployeesModule, DepartmentsModule],
})
export class HrMainModule {}
