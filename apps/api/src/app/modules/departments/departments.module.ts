import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [DepartmentsController],
  providers: [DepartmentsService],
})
export class DepartmentsModule {}
