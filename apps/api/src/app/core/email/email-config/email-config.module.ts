import { Module } from '@nestjs/common';
import { SendgridEmailController } from './sendgrid-email.controller';
import { SendgridEmailService } from './sendgrid-email.service';

@Module({
  controllers: [SendgridEmailController],
  providers: [SendgridEmailService],
})
export class EmailConfigModule {}
