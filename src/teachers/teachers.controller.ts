import { Controller, Post, Body } from '@nestjs/common'
import { TeachersService } from './teachers.service'

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  // REGISTER
  @Post()
  createTeacher(@Body() body: any) {
    return this.teachersService.create(body)
  }

  // LOGIN
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body
    return this.teachersService.login(email, password)
  }
}
