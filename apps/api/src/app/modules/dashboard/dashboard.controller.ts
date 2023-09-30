import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { HrResponse } from '../../core/models/classes/HrResponse';
import { HrErrorresponse } from '../../core/models/classes/HrErrorResponse';

@Controller('/dashboard')
@ApiTags('/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('/dashboard-details')
  async getDashboardDetails() {
    try {
      const res = await this.dashboardService.countHrData();
      return new HrResponse(res, 'all data here', HttpStatus.OK);
    } catch (error) {
      throw new HrErrorresponse(
        'an error goes here',
        HttpStatus.BAD_REQUEST,
        error
      );
    }
  }
}
