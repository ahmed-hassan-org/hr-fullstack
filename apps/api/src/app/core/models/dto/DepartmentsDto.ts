import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DepartmentsDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'departmet id is required' })
  departmentId: number;
  @IsNotEmpty({ message: 'departmet name is required' })
  @ApiProperty()
  departmentName: string;
  @ApiProperty()
  managerId: number;
  @ApiProperty()
  locationId: number;
}
