import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common'
import { StudentsService } from './students.service'
import { Student } from './students.schema'

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // REGISTER siswa
  @Post()
  create(@Body() body: { nis: string; name: string; class: string; email: string; password: string }): Promise<Student> {
    return this.studentsService.create(body)
  }

  // LOGIN siswa
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body
    return this.studentsService.login(email, password)
  }

  // GET ALL siswa
  @Get()
  findAll(): Promise<Student[]> {
    return this.studentsService.findAll()
  }

  // DELETE siswa
  @Delete(':nis')
  delete(@Param('nis') nis: string) {
    return this.studentsService.deleteByNis(nis)
  }
}
