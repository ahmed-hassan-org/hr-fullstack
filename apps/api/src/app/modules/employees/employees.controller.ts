import { Controller, Get, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('/employees')
export class EmployeesController {
  constructor(private empService: EmployeesService) {}
  @Get('/employees')
  async getAllEmployees() {
    try {
      const res = await this.empService.getAllEmployees();
      return { data: res, status: 200 };
    } catch (error) {
      return { error: error };
    }
  }

  @Get('/employees/:empId')
  async getOneEmployee(@Param('empId') empId: number) {
    try {
      const res = await this.empService.getOneEmployee(empId);
      return { data: res, status: 200 };
    } catch (error) {
      return { error: error };
    }
  }
}
