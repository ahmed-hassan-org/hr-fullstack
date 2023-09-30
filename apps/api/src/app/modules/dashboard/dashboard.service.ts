import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma-module/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async countHrData() {
    const countEmps = await this.prisma.employees.aggregate({
      _count: { employee_id: true },
      _sum: { salary: true },
    });
    const countDepts = await this.prisma.departments.count();
    const countLocations = await this.prisma.locations.count();
    const countCountry = await this.prisma.countries.count();
    const countRegions = await this.prisma.regions.count();

    return new Promise((res) =>
      res({
        countEmps,
        countDepts,
        countLocations,
        countCountry,
        countRegions,
      })
    );
  }
}
