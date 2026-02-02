import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Student } from './students.schema';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get()
  findAll(): Promise<Student[]> {
    return this.studentsService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Student>) {
    return this.studentsService.create(body);
  }

  @Patch('attendance/:nis')
  updateAttendance(
    @Param('nis') nis: string,
    @Body() body: UpdateStatusDto,
  ) {
    return this.studentsService.updateStatus(nis, body.status);
  }

  @Patch('reset/:nis')
  resetAttendance(@Param('nis') nis: string) {
    return this.studentsService.resetStatus(nis);
  }

  @Delete(':nis')
  delete(@Param('nis') nis: string) {
    return this.studentsService.deleteByNis(nis);
  }
}
