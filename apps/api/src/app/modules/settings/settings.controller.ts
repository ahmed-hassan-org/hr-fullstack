import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../db/prisma-module/prisma.service';
import { HrResponse } from '../../core/models/classes/HrResponse';

@Controller('/settings')
@ApiTags('Settings')
export class SettingsController {
  constructor(private prisma: PrismaService) {}

  @Get('/')
  async getAllService() {
    try {
      const res = await this.prisma.settings.findMany();
      return new HrResponse(res, '', HttpStatus.OK, []);
    } catch (error) {
      return new HrResponse(null, '', HttpStatus.NOT_FOUND, error);
    }
  }
}
