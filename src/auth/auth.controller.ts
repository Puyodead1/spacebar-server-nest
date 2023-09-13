import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos';

@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login() {
    return this.authService.login();
  }

  @Post('register')
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
