import { Controller, Get, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';

@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('scan')
  async scan(@Body() body: { nis: string; name: string; status: string; time: string }) {
    return this.attendanceService.create(body);
  }

  @Get('history')
  getHistory() {
    return this.attendanceService.getHistory();
  }

  @Post('reset')
  reset() {
    return this.attendanceService.resetAll();
  }
}
