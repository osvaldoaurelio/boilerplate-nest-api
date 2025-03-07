import { Global, Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { DevEmailService } from './dev-email.service';
import { EMAIL_SERVICE } from './email.interface';
import { SesEmailService } from './ses-email.service';
import { TemplateService } from './template.service';

@Global()
@Module({
  providers: [
    TemplateService,
    DevEmailService,
    SesEmailService,
    {
      provide: EMAIL_SERVICE,
      inject: [ConfigService, DevEmailService, SesEmailService],
      useFactory(
        config: ConfigService,
        devEmail: DevEmailService,
        sesEmail: SesEmailService,
      ) {
        return config.get('NODE_ENV') === 'production' ? sesEmail : devEmail;
      },
    },
  ],
  exports: [EMAIL_SERVICE],
})
export class EmailModule {}
