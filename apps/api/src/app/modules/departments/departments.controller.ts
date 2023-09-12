import {
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../db/prisma-module/prisma.service';
import { HrResponse } from '../../core/models/classes/HrResponse';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { departments } from '@prisma/client';

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
    @Query('skip') skip = 1,
    @Query('take') take = 5,
    @Query('order') order = 'asc'
  ) {
    try {
      const deptsCached = await this.cacheManager.get('depts');
      if (deptsCached) {
        console.log('from cached data');
        return new HrResponse(deptsCached, 'all data here', HttpStatus.OK, []);
      } else {
        console.log('from main data');
        const res = await this.prisma.departments.findMany({
          select: { department_id: true, department_name: true },
        });
        await this.cacheManager.set('depts', res);
        return new HrResponse(res, 'all data here', HttpStatus.OK, []);
      }
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
}
