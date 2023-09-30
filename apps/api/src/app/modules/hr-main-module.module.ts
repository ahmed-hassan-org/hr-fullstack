import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [
    EmployeesModule,
    DepartmentsModule,
    UsersModule,
    SettingsModule,
    DashboardModule,
  ],
  exports: [
    EmployeesModule,
    DepartmentsModule,
    UsersModule,
    SettingsModule,
    DashboardModule,
  ],
})
export class HrMainModule {}
