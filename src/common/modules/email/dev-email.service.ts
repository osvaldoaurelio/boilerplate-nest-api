import { Injectable, OnModuleInit } from '@nestjs/common';
import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
  Transporter,
} from 'nodemailer';
import { LoggerService } from '../logger/logger.service';
import { IEmailService } from './email.interface';
import { TemplateService } from './template.service';
import { EmailOptions } from './email.type';

@Injectable()
export class DevEmailService implements IEmailService, OnModuleInit {
  private transporter: Transporter;

  constructor(
    private readonly logger: LoggerService,
    private readonly template: TemplateService,
  ) {
    this.logger.log('DevEmailService initialized', 'DevEmailService');
  }

  async onModuleInit() {
    const { smtp, user, pass } = await createTestAccount();

    this.transporter = createTransport({ ...smtp, auth: { user, pass } });
  }

  async sendEmail({ to, subject, template, context }: EmailOptions) {
    const html = await this.template.compile(template, context);

    const info = await this.transporter.sendMail({
      to,
      subject,
      html,
    });

    this.logger.log(
      `Email sent to ${to} with subject ${subject}\n${getTestMessageUrl(info)}`,
      'DevEmailService',
    );
  }
}
