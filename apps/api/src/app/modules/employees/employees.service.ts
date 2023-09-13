import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma-module/prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private empsRepo: PrismaService) {}

  getAllEmployees() {
    return this.empsRepo.employees.findMany();
  }

  getOneEmployee(employeeId: number) {
    return this.empsRepo.employees.findFirst({
      where: { employee_id: employeeId },
    });
  }

  createEmployee(empData: any) {
    return this.empsRepo.employees.create({ data: { ...empData } });
  }

  updateEmployee(empId: number, empData: any) {
    return this.empsRepo.employees.update({
      where: { employee_id: empId },
      data: { ...empData },
    });
  }

  deleteEmployee(empId: number) {
    return this.empsRepo.employees.delete({ where: { employee_id: empId } });
  }
}
