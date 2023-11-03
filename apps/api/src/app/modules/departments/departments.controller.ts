import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../db/prisma-module/prisma.service';
import { HrResponse } from '../../core/models/classes/HrResponse';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { departments } from '@prisma/client';
import { DepartmentsDto } from '../../core/models/dto/DepartmentsDto';
import { paginator, searchPaginator } from '@nodeteam/nestjs-prisma-pagination';
// import types
import { PaginatorTypes } from '@nodeteam/nestjs-prisma-pagination';

@Controller('departments')
@ApiTags('Departments')
export class DepartmentsController {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

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
  @ApiQuery({
    name: 'order',
    description: 'sort items ASC or DESC',
    type: 'string',
    required: false,
  })
  async getAllDepartments(
    @Query('skip') page = 1,
    @Query('take') perPage = 5,
    @Query('order') order = 'asc'
  ) {
    const paginate: PaginatorTypes.PaginateFunction = paginator({
      page: 1,
      perPage: 10,
    });
    try {
      const res = await paginate(
        this.prisma.departments,
        {},
        { page, perPage }
      );
      await this.cacheManager.set('depts', res);
      return new HrResponse(res, 'all data here', HttpStatus.OK, []);
    } catch (error) {
      return new HrResponse(null, 'not data', HttpStatus.NOT_FOUND, error);
    }
  }

  @Get('/:id')
  async gettOneDept(@Param('id') deptId: number) {
    try {
      const deptsCached: departments = await this.cacheManager.get('dept');

      if (deptsCached && deptsCached.department_id === deptId) {
        return new HrResponse(deptsCached, 'all from cache', HttpStatus.OK, []);
      } else {
        const res = await this.prisma.departments.findFirst({
          where: { department_id: deptId },
        });
        await this.cacheManager.set('dept', res);
        return new HrResponse(res, 'all data here new', HttpStatus.OK, []);
      }
    } catch (error) {
      return new HrResponse(
        null,
        'not data found',
        HttpStatus.NOT_FOUND,
        error
      );
    }
  }

  @Post('/create')
  async createDepartment(@Body() deptData: DepartmentsDto) {
    try {
      const isExistsDept = await this.prisma.departments.findFirst({
        where: { department_id: deptData.department_id },
      });
      if (isExistsDept && isExistsDept.department_id) {
        return new HrResponse(
          null,
          'dept already exists',
          HttpStatus.BAD_REQUEST,
          ['dept already exists']
        );
      }
      const res = await this.prisma.departments.create({ data: deptData });
      if (res) {
        return new HrResponse(res, 'new dept created', HttpStatus.CREATED, []);
      }
    } catch (error) {
      return new HrResponse(
        null,
        'an error goes here',
        HttpStatus.BAD_REQUEST,
        error
      );
    }
  }

  @Put('/update')
  async updateDepartment(@Body() deptData: DepartmentsDto) {
    try {
      const isExistsDept = await this.prisma.departments.findFirst({
        where: { department_id: deptData.department_id },
      });
      if (isExistsDept && isExistsDept.department_id) {
        return new HrResponse(
          null,
          'dept already exists',
          HttpStatus.BAD_REQUEST,
          ['dept already exists']
        );
      }
      const res = await this.prisma.departments.update({
        where: { department_id: deptData.department_id },
        data: deptData,
      });
      if (res) {
        return new HrResponse(res, 'new dept created', HttpStatus.CREATED, []);
      }
    } catch (error) {
      return new HrResponse(
        null,
        'an error goes here',
        HttpStatus.BAD_REQUEST,
        error
      );
    }
  }

  @Delete('/delete/:id')
  async deleteDepartment(@Param('id') deptId: number) {
    try {
      const isExists = await this.prisma.departments.findFirst({
        where: { department_id: deptId },
      });
      if (!isExists && !isExists.department_id) {
        return new HrResponse(null, 'dept not found', HttpStatus.BAD_REQUEST, [
          'dept not found',
        ]);
      }
      const countEmpByDeptId = await this.prisma.employees.aggregate({
        _count: { employee_id: true },
        where: { department_id: deptId },
      });

      if (countEmpByDeptId._count.employee_id > 0) {
        return new HrResponse(
          null,
          'dept have employees cannot delete it',
          HttpStatus.BAD_REQUEST,
          ['dept have employees cannot delete it']
        );
      } else {
        const res = await this.prisma.departments.delete({
          where: { department_id: deptId },
        });
        return new HrResponse(res, 'dept deleted well', HttpStatus.OK, []);
      }
    } catch (error) {
      return new HrResponse(
        null,
        'an error goes here',
        HttpStatus.BAD_REQUEST,
        error
      );
    }
  }
}
