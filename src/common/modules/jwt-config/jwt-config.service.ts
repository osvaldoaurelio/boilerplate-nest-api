import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '3d' },
    };
  }
}
