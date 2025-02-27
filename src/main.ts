import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './common/modules/config/config.service';
import { LoggerService } from './common/modules/logger/logger.service';
import { SwaggerService } from './common/modules/swagger/swagger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    logger: new LoggerService(),
  });

  const config = app.get(ConfigService);
  app.setGlobalPrefix(config.get<string>('GLOBAL_PREFIX'));
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
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const swagger = app.get(SwaggerService);
  swagger.setup(app);

  const port = config.get<number>('PORT');
  await app.listen(port, () => {
    const logger = app.get(LoggerService);
    logger.log(`Server is up and running on port ${port}`, 'Bootstrap');
  });
}

bootstrap();
