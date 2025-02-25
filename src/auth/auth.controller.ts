import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { LogInResponseDto } from './dto/log-in-response.dto';
import { SignUpResponseDto } from './dto/sign-up-response.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './interfaces/auth-request';
import { HashUserPasswordPipe } from './pipes/hash-user-password.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() { user }: AuthRequest) {
    const access_token = await this.authService.login(user);

    return plainToInstance(LogInResponseDto, { access_token });
  }

  @IsPublic()
  @Post('signup')
  async signup(@Body(HashUserPasswordPipe) signUpDto: SignUpDto) {
    const user = await this.authService.signup(signUpDto);

    return plainToInstance(SignUpResponseDto, user);
  }
}
