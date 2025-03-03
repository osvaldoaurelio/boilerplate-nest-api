import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import * as path from 'node:path';
import { ConfigService } from '../config/config.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class SwaggerService {
  private path: string;

  constructor(
    private readonly config: ConfigService,
    private readonly logger: LoggerService,
  ) {
    const global_prefix = this.config.get<string>('GLOBAL_PREFIX');
    this.path = path.join('/', global_prefix, 'docs');
  }

  setup(app: INestApplication) {
    if (this.config.get<string>('NODE_ENV') === 'production') return;

    const config = new DocumentBuilder()
      .setTitle('NestJS')
      .setDescription('Boilerplate NestJS API')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const options: SwaggerCustomOptions = {
      customSiteTitle: 'Boilerplate NestJS',
    };

    SwaggerModule.setup(this.path, app, document, options);

    setTimeout(() => {
      this.logger.log(`Mapped {${this.path}, GET} route`, 'Swagger API Docs');
    }, 999);
  }
}
