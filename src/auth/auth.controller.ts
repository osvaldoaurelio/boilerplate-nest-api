import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { ApiLogInDoc, ApiSignUpDoc } from './docs/api-auth.doc';
import { CreateSignUpDto } from './dtos/create-sign-up.dto';
import { LogInDto } from './dtos/log-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interfaces/auth-request';
import { HashUserPasswordPipe } from './pipes/hash-user-password.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @ApiLogInDoc()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: AuthRequest) {
    const access_token = await this.authService.login(user);

    return plainToInstance(LogInDto, { access_token });
  }

  @IsPublic()
  @ApiSignUpDoc()
  @Post('signup')
  async signup(@Body(HashUserPasswordPipe) signUpDto: CreateSignUpDto) {
    const user = await this.authService.signup(signUpDto);

    return plainToInstance(SignUpDto, user);
  }

  @IsPublic()
  @Post('confirm-email/:id')
  async confirmEmail(@Param('id', ParseUUIDPipe) id: string) {
    const message = await this.authService.confirmEmail(id);

    return { message };
  }
}
