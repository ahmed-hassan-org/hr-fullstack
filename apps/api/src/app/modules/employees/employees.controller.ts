import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '../../core/models/dto/EmployeeDto';
import { HrResponse } from '../../core/models/classes/HrResponse';

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

  @Post('/create')
  async createEmployee(@Body() empData: CreateEmployeeDto) {
    try {
      const isExistsEmp = await this.empService.getOneEmployee(
        empData.employeeId
      );
      if (isExistsEmp) {
        return new HrResponse(
          null,
          'employee already exists',
          HttpStatus.BAD_REQUEST,
          ['employee exists']
        );
      } else {
        const res = await this.empService.createEmployee(empData);
        return new HrResponse(res, 'created', HttpStatus.CREATED, []);
      }
    } catch (error) {
      return new HrResponse(null, 'not created', HttpStatus.BAD_REQUEST, error);
    }
  }

  @Put('/update/:id')
  async updateEmployee(
    @Body() empData: UpdateEmployeeDto,
    @Param('id') empId: number
  ) {
    try {
      const isExistsEmp = await this.empService.getOneEmployee(empId);
      if (!isExistsEmp) {
        return new HrResponse(
          null,
          'request employee not found to update it',
          HttpStatus.BAD_REQUEST,
          ['employee not exists']
        );
      } else {
        const res = await this.empService.updateEmployee(empId, empData);
        return new HrResponse(
          res,
          'employee data updated',
          HttpStatus.CREATED,
          []
        );
      }
    } catch (error) {
      return new HrResponse(null, 'not created', HttpStatus.BAD_REQUEST, error);
    }
  }

  @Delete('/delete/:id')
  async deleteEmployee(@Param('id', ParseIntPipe) empId: number) {
    try {
      const res = await this.empService.deleteEmployee(empId);
      if (!res.affected) {
        return new HrResponse(
          null,
          `no employee with this id: ${empId}`,
          HttpStatus.OK,
          []
        );
      } else {
        return new HrResponse(
          res,
          `employee with id: ${empId} deleted well`,
          HttpStatus.OK,
          []
        );
      }
    } catch (error) {
      return new HrResponse(null, 'not created', HttpStatus.BAD_REQUEST, error);
    }
  }
}
