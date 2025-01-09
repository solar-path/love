import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() user: { email: string; password: string }) {
    return this.authService.register(user);
  }

  @Post('login')
  async login(@Body() user: { email: string; password: string }) {
    return this.authService.login(user);
  }

  @Post('invite-user')
  async inviteUser(@Body() user: { email: string }) {
    return this.authService.inviteUser(user);
  }

  @Get('test')
  @UseGuards(AuthGuard)
  async test(@Req() req: Request) {
    return 'test';
  }
}
