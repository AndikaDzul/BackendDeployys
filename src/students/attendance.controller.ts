import { Controller, Get, Post, Body } from '@nestjs/common';

interface Attendance {
  id: number;
  nis: string;
  name: string;
  class: string;
  status: string;
  time: string;
}

@Controller('attendance')
export class AttendanceController {
  private attendance: Attendance[] = [];

  @Post()
  create(@Body() body: Attendance) {
    const data: Attendance = {
      id: Date.now(),
      nis: body.nis,
      name: body.name,
      class: body.class,
      status: body.status,
      time: new Date().toLocaleTimeString(),
    };

    this.attendance.push(data);
    return data;
  }

  @Get()
  findAll() {
    return this.attendance;
  }
}
