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

  createDepartment(data: any) {
    return this.deptRepo.departments.create({ data: data });
  }

  updateDepartment(deptId: number, data: any) {
    return this.deptRepo.departments.update({
      where: { department_id: deptId },
      data: data,
    });
  }

  deleteDepartment(deptId: number) {
    return this.deptRepo.departments.delete({
      where: { department_id: deptId },
    });
  }
}
