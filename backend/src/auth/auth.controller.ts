import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  signup(@Body() dto: SignUpDto): Promise<Tokens> {
    return this.authService.signup(dto);
  }

  @HttpCode(200)
  @Post('signin')
  signin(@Body() dto: SignInDto): Promise<Tokens> {
    return this.authService.signin(dto);
  }
}
