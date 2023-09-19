/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SendgridEmailService } from './sendgrid-email.service';

@ApiTags('Email Service')
@Controller('Email')
export class SendgridEmailController {
  constructor(
    private sendgridEmail: SendgridEmailService
  ) // private smtpEmail: SmtpEmailService
  {}

  @Post()
  async sendEmailSendgrid(
    @Query('toEmail') to: string,
    @Query('subject') subject: string,
    @Query('body') body: string
  ) {
    try {
      const res = await this.sendgridEmail.send({
        to: to,
        subject: subject,
        from: 'messi10010@gmail.com',
        html: `
        <h1>Hello mr ahmed zoz</h1>
        <h5>are you ok pro</h5>
        <p>${body}</p>
        `,
      });
      return { mes: 'email send success to:', data: res, error: null };
    } catch (error) {
      return { msg: 'an error goes here', error: error, data: null };
    }
  }

  // @Get('/smtp-email')
  // async sendSmtpEmail() {
  //   try {
  //     let res = await this.smtpEmail.sendUserConfirmation();
  //     return { data: 'email sent' };
  //   } catch (error) {
  //     return { data: 'an eror here', error: error };
  //   }
  // }
}
