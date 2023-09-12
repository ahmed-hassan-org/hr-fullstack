import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsInt({ message: 'employee id must be a number' })
  @IsNotEmpty({ message: 'employee id is required' })
  @ApiProperty()
  employeeId: number;
  @IsString({ message: 'first name must be a string' })
  @ApiProperty()
  firstName: string;
  @IsString({ message: 'last name must be a string' })
  @IsNotEmpty({ message: 'last name is required' })
  @ApiProperty()
  lastName: string;
  @IsEmail({}, { message: 'please enter a valid email address' })
  @ApiProperty()
  email: string;
  phoneNumber: string;
  @IsDateString(
    { strict: true },
    { message: 'please enter valid date', each: true }
  )
  @ApiProperty()
  hireDate: string;
  @ApiProperty()
  @IsString({ message: 'job id must be a string' })
  jobId: string;
  @IsNumber(
    { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 3 },
    { message: 'please enter a valid salary' }
  )
  @IsNotEmpty({ message: 'salary is required' })
  @ApiProperty()
  salary: string;
  commissionPct: string;
  @ApiProperty()
  @IsInt({ message: 'manager id must be integer value' })
  managerId: number;
  @ApiProperty()
  @IsInt({ message: 'department id must be integer' })
  departmentId: number;
}


export class UpdateEmployeeDto {
    @IsString({ message: 'first name must be a string' })
    @ApiProperty()
    firstName: string;
    @IsString({ message: 'last name must be a string' })
    @ApiProperty()
    lastName: string;
    @IsEmail({}, { message: 'please enter a valid email address' })
    @ApiProperty()
    email: string;
    phoneNumber: string;
    @IsDateString(
      { strict: true },
      { message: 'please enter valid date', each: true }
    )
    @ApiProperty()
    hireDate: string;
    @ApiProperty()
    @IsString({ message: 'job id must be a string' })
    jobId: string;
    @IsNumber(
      { allowNaN: false, allowInfinity: false, maxDecimalPlaces: 3 },
      { message: 'please enter a valid salary' }
    )
    @ApiProperty()
    salary: string;
    commissionPct: string;
    @ApiProperty()
    @IsInt({ message: 'manager id must be integer value' })
    managerId: number;
    @ApiProperty()
    @IsInt({ message: 'department id must be integer' })
    departmentId: number;
  }
  