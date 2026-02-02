import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Schedule, ScheduleDocument } from './schedule.schema';

@Injectable()
export class SchedulesService {
  constructor(@InjectModel(Schedule.name) private scheduleModel: Model<ScheduleDocument>) {}

  async findAll(): Promise<Schedule[]> {
    return this.scheduleModel.find().exec();
  }

  async create(data: Partial<Schedule>) {
    const schedule = new this.scheduleModel(data);
    return schedule.save();
  }
}
