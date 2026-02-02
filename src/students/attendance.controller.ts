import { Controller, Get, Post, Patch, Body, Param, NotFoundException, BadRequestException } from '@nestjs/common';

export interface Attendance {
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

  // ================= CREATE ATTENDANCE =================
  @Post()
  create(@Body() body: Partial<Attendance>) {
    if (!body.nis) throw new BadRequestException('NIS wajib diisi');

    const data: Attendance = {
      id: Date.now(),
      nis: body.nis,
      name: body.name || 'Unknown',
      class: body.class || 'Unknown',
      status: body.status || 'Belum Absen',
      time: new Date().toLocaleTimeString(),
    };

    this.attendance.push(data);
    return data;
  }

  // ================= GET ALL ATTENDANCE =================
  @Get()
  findAll(): Attendance[] {
    return this.attendance;
  }

  // ================= UPDATE STATUS =================
  @Patch(':nis')
  updateStatus(@Param('nis') nis: string, @Body() body: { status: string }) {
    if (!body.status) throw new BadRequestException('Status wajib diisi');

    const record = this.attendance.find(a => a.nis === nis);
    if (!record) throw new NotFoundException(`Siswa dengan NIS ${nis} tidak ditemukan`);

    record.status = body.status;
    record.time = new Date().toLocaleTimeString();
    return record;
  }

  // ================= GET SINGLE ATTENDANCE =================
  @Get(':nis')
  findOne(@Param('nis') nis: string) {
    const record = this.attendance.find(a => a.nis === nis);
    if (!record) throw new NotFoundException(`Siswa dengan NIS ${nis} tidak ditemukan`);
    return record;
  }
}
