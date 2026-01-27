import { Controller, Get, Post, Body, Query } from '@nestjs/common'
import { SchedulesService } from './schedules.service'

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  // ✅ GET jadwal by mapel
  @Get()
  getByMapel(@Query('mapel') mapel: string) {
    if (!mapel) return []
    return this.schedulesService.findByMapel(mapel)
  }

  // ✅ POST jadwal (INI YANG KAMU BUTUHKAN)
  @Post()
  create(@Body() body: any) {
    return this.schedulesService.create(body)
  }
}
