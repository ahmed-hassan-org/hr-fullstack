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
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '../../core/models/dto/EmployeeDto';
import { HrResponse } from '../../core/models/classes/HrResponse';
import { AuthGuardJwt } from '../../core/guards/auth.guard';
import { HrErrorresponse } from '../../core/models/classes/HrErrorResponse';
import { JwtAuthGuardGuard } from '../../core/guards/jwtauthguard.guard';
import { Roles } from '../../core/decorator/roles.decorator';
import { HrRoles } from '../../core/security/model/HrRoles.enum';
import { RolesGuard } from '../../core/guards/rolesguard.guard';
import { paginator, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';
// import types
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';
import { PrismaService } from '../../db/prisma-module/prisma.service';
@ApiTags('Employees')
@Controller('/employees')
export class EmployeesController {
  constructor(
    private empService: EmployeesService,
    private empsRepo: PrismaService
  ) {}
  @UseGuards(JwtAuthGuardGuard)
  @Get('/')
  @ApiQuery({
    name: 'skip',
    description: 'skip first items count',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'take',
    description: 'show number of items',
    type: 'number',
    required: false,
  })
  async getAllEmployees(@Query('skip') page = 1, @Query('take') perPage = 5) {
    const paginate: PaginatorTypes.PaginateFunction = paginator({
      page: 1,
      perPage: 10,
    });
    try {
      const res = await paginate(
        this.empsRepo.employees,
        {},
        { page, perPage }
      );
      return new HrResponse(res, 'data found', HttpStatus.OK, []);
    } catch (error) {
      return { error: error };
    }
  }

  // @UseGuards(JwtAuthGuardGuard, RolesGuard)
  @UseGuards(JwtAuthGuardGuard)
  // @Roles(HrRoles.REVIEW_USER, HrRoles.ADMIN_USER)
  // @ApiBearerAuth()
  @Get('/:empId')
  async getOneEmployee(@Param('empId') empId: number, @Request() req: Request) {
    console.log(req.headers);

    try {
      const res = await this.empService.getOneEmployee(empId);
      return new HrResponse(res, 'data found', HttpStatus.OK, []);
    } catch (error) {
      throw new HrErrorresponse('no data found', HttpStatus.NOT_FOUND, error);
    }
  }

  @UseGuards(AuthGuardJwt)
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
        return new HrResponse(res, 'employee created', HttpStatus.CREATED, []);
      }
    } catch (error) {
      throw new HrErrorresponse(
        'employee not created',
        HttpStatus.BAD_REQUEST,
        error
      );
    }
  }

  @UseGuards(AuthGuardJwt)
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
      throw new HrErrorresponse('not created', HttpStatus.BAD_REQUEST, error);
    }
  }

  @UseGuards(AuthGuardJwt)
  @Delete('/delete/:id')
  async deleteEmployee(@Param('id', ParseIntPipe) empId: number) {
    try {
      const res = await this.empService.deleteEmployee(empId);
      if (!res) {
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
      throw new HrErrorresponse('not created', HttpStatus.BAD_REQUEST, error);
    }
  }
}
