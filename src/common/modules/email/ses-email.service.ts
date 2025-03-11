import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';
import { IEmailService } from './email.interface';
import { TemplateService } from './template.service';
import { EmailOptions } from './email.type';

@Injectable()
export class SesEmailService implements IEmailService {
  private sesClient: SESClient;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
    private readonly template: TemplateService,
  ) {
    this.sesClient = new SESClient({
      region: this.config.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.config.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.config.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async sendEmail({ to, subject, template, context }: EmailOptions) {
    const html = await this.template.compile(template, context);

    const command = new SendEmailCommand({
      Source: this.config.get<string>('EMAIL_SENDER'),
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Charset: 'UTF-8', Data: subject },
        Body: { Html: { Charset: 'UTF-8', Data: html } },
      },
    });

    await this.sesClient.send(command);
  }
}
