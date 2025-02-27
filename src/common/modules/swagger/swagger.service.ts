import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SwaggerService {
  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {}

  setup(app: INestApplication) {
    if (this.config.get<string>('NODE_ENV') === 'production') return;

    const path = `${this.config.get<string>('GLOBAL_PREFIX')}/docs`;

    const config = new DocumentBuilder()
      .setTitle('NestJS')
      .setDescription('Boilerplate NestJS API')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const options: SwaggerCustomOptions = {
      customSiteTitle: 'Boilerplate NestJS',
    };

    SwaggerModule.setup(path, app, document, options);

    setTimeout(() => {
      this.logger.log(`Mapped {/${path}, GET} route`, 'Swagger API Docs');
    }, 100);
  }
}
