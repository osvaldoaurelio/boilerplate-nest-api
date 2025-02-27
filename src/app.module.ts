import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { LogInterceptor } from './common/interceptors/log.interceptor';
import { ConfigModule } from './common/modules/config/config.module';
import { LoggerModule } from './common/modules/logger/logger.module';
import { PrismaModule } from './common/modules/prisma/prisma.module';
import { SwaggerModule } from './common/modules/swagger/swagger.module';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    AuthModule,
    ConfigModule,
    LoggerModule,
    PrismaModule,
    TaskModule,
    UserModule,
    SwaggerModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
  ],
})
export class AppModule {}
