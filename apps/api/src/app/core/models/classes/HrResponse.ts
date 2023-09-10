import { HttpStatus } from '@nestjs/common';

export class HrResponse {
  private data: any;
  private message: string;
  private httpStatus: HttpStatus;
  private errors: string[];
  constructor(
    data: any,
    message: string,
    httpStatus: any,
    errors: string[] = []
  ) {
    this.data = data;
    this.message = message;
    this.httpStatus = httpStatus;
    this.errors = errors;
  }
}
