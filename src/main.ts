import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerService } from './common/modules/swagger/swagger.service';
import { ConfigService } from './common/modules/config/config.service';
import { LoggerService } from './common/modules/logger/logger.service';

const validatePipe = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new LoggerService(),
  });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT');
  const global_prefix = config.get<string>('GLOBAL_PREFIX');

  app.setGlobalPrefix(global_prefix);
  app.enableCors({
    origin: config.get<string>('CORS_ORIGIN'),
    methods: config.get<string>('CORS_METHODS'),
    credentials: config.get<boolean>('CORS_CREDENTIALS'),
  });
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: config.get<string>('API_VERSION_PREFIX'),
    defaultVersion: config.get<string>('API_VERSION_DEFAULT'),
  });
  app.useGlobalPipes(validatePipe);

  SwaggerService.setup(app, global_prefix);

  await app.listen(port, () => {
    app.get(LoggerService).log(`Server running on port ${port}`);
  });
}

bootstrap();
