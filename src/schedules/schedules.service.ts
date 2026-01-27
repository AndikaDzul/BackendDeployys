import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Schedule } from './schedule.schema'

@Injectable()
export class SchedulesService {
  constructor(
    @InjectModel(Schedule.name)
    private scheduleModel: Model<Schedule>,
  ) {}

  async create(data: any) {
    return await this.scheduleModel.create(data)
  }

  async findByMapel(mapel: string) {
    return await this.scheduleModel.find({
      mapel: { $regex: mapel, $options: 'i' },
    })
  }
}
