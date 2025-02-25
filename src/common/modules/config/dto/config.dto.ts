import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ConfigDto {
  // JWT settings
  @IsString()
  JWT_SECRET: string = 'secret';

  // Database settings
  @IsString()
  DATABASE_URL: string;

  // Server settings
  @IsNumber()
  PORT: number = 3332;

  @IsString()
  GLOBAL_PREFIX: string = 'api';

  // CORS settings
  @IsString()
  CORS_ORIGIN: string = '*';

  @IsString()
  CORS_METHODS: string = 'GET,PATCH,POST,DELETE';

  @IsBoolean()
  CORS_CREDENTIALS: boolean = true;

  // Versioning settings
  @IsString()
  API_VERSION_PREFIX: string = 'v';

  @IsString()
  API_VERSION_DEFAULT: string = '1';

  // Email settings
  @IsString()
  SMTP_HOST: string = 'smtp.example.email';

  @IsNumber()
  SMTP_PORT: number = 587;

  @IsBoolean()
  SMTP_SECURE: boolean = false;

  @IsString()
  SMTP_USER: string = 'user@example.email';

  @IsString()
  SMTP_PASS: string = 'password';

  @IsString()
  EMAIL_FROM: string = 'user@example.email';

  // Environment settings
  @IsString()
  NODE_ENV: string = 'development';
}
