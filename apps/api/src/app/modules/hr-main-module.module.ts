import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [EmployeesModule, DepartmentsModule, UsersModule, SettingsModule],
  exports: [EmployeesModule, DepartmentsModule, UsersModule, SettingsModule],
})
export class HrMainModule {}
