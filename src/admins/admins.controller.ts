import { Controller, Post, Body } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Post('register')
  register(@Body() body: { name: string; email: string; password: string }) {
    return this.adminsService.register(body);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.adminsService.login(body.email, body.password);
  }
}
