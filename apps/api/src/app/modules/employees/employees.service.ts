import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from '../../db/entities/Employees';
import { Repository } from 'typeorm';
import {
  CreateEmployeeDto,
  UpdateEmployeeDto,
} from '../../core/models/dto/EmployeeDto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees) private empsRepo: Repository<Employees>
  ) {}

  getAllEmployees() {
    return this.empsRepo.find();
  }

  getOneEmployee(employeeId: number) {
    return this.empsRepo.findBy({ employeeId: employeeId });
  }

  createEmployee(empData: CreateEmployeeDto) {
    return this.empsRepo.save(empData);
  }

  updateEmployee(empId: number, empData: UpdateEmployeeDto) {
    return this.empsRepo.update(empId, empData);
  }

  deleteEmployee(empId: number) {
    return this.empsRepo.delete(empId);
  }
}
