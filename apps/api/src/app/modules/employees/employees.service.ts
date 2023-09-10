import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employees } from '../../db/entities/Employees';
import { Repository } from 'typeorm';

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
}
