import SendGrid from '@sendgrid/mail';

import { Injectable } from '@nestjs/common';
import { environment } from 'apps/api/src/environments/environment';

@Injectable()
export class SendgridEmailService {
  constructor() {
    SendGrid.setApiKey(environment.sendgrid.API_KEY);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    console.log(`Email successfully dispatched to ${mail.to}`);
    return transport;
  }
}
