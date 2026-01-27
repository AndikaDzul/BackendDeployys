import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ timestamps: true })
export class Schedule extends Document {
  @Prop({ required: true })
  day: string

  @Prop({ required: true })
  time: string

  @Prop({ required: true })
  kelas: string

  @Prop({ required: true })
  mapel: string

  @Prop({ required: true })
  teacher: string
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule)
