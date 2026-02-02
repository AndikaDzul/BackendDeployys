import { Controller, Get, Post, Body } from '@nestjs/common';
import { SchedulesService } from './schedules.service';

@Controller('schedule')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Get()
  findAll() {
    return this.schedulesService.findAll();
  }

  @Post()
  create(@Body() body: any) {
    return this.schedulesService.create(body);
  }
}
