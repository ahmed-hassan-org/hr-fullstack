import { HttpException, HttpStatus } from '@nestjs/common';

export class HrErrorresponse extends HttpException {
  private messages: string;
  private httpStatus: HttpStatus;

  constructor(message: string, httpStatus: any, errorList: string[] | string) {
    super(message, httpStatus, { cause: errorList });
    this.messages = message;
    this.httpStatus = httpStatus;
  }
}
