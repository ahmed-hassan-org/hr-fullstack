import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class DepartmentsDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'departmet id is required' })
  @IsInt({ message: 'department id must be a number' })
  department_id: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'departmet name is required' })
  @IsString({ message: 'department name must be a string' })
  department_name: string;
  @ApiProperty()
  manager_id: number;
  @ApiProperty()
  location_id: number;
}
