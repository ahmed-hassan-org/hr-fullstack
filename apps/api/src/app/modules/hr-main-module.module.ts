import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule, UsersModule],
  exports: [EmployeesModule, DepartmentsModule, UsersModule],
})
export class HrMainModule {}
