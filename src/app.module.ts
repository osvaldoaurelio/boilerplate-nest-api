import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/common/filters/global-exception.filter';
import { LogInterceptor } from 'src/common/interceptors/log.interceptor';
import { CacheModule } from 'src/common/modules/cache/cache.module';
import { ConfigModule } from 'src/common/modules/config/config.module';
import { EmailModule } from 'src/common/modules/email/email.module';
import { EventModule } from 'src/common/modules/event/event.module';
import { LoggerModule } from 'src/common/modules/logger/logger.module';
import { PrismaModule } from 'src/common/modules/prisma/prisma.module';
import { SwaggerModule } from 'src/common/modules/swagger/swagger.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    AuthModule,
    CacheModule,
    ConfigModule,
    EmailModule,
    EventModule,
    LoggerModule,
    PrismaModule,
    TaskModule,
    UserModule,
    SwaggerModule,
  ],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_INTERCEPTOR, useClass: LogInterceptor },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
