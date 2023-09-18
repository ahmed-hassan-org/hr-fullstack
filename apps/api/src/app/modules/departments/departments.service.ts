import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../db/prisma-module/prisma.service';

@Injectable()
export class DepartmentsService {
  constructor(private deptRepo: PrismaService) {}

  getAllDepartments() {
    return this.deptRepo.departments.findMany();
  }

  getOneDepartment(deptId: number) {
    return this.deptRepo.departments.findFirstOrThrow({
      where: { department_id: deptId },
    });
  }
}
