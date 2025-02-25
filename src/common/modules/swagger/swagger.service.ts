import { INestApplication, Injectable } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  static setup(app: INestApplication, global_prefix = '') {
    const path = `${global_prefix}/docs`;

    const config = new DocumentBuilder()
      .setTitle('NestJS')
      .setDescription('Boilerplate Nestjs API')
      .setVersion('1.0')
      .addTag('Tasks', 'Tasks Routes')
      .addTag('Auth', 'Auth Routes')
      .addTag('Users', 'Users Routes')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const options: SwaggerCustomOptions = {
      customSiteTitle: 'Boilerplate',
    };

    SwaggerModule.setup(path, app, document, options);
  }
}
