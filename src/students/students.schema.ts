import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type StudentDocument = Student & Document

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true, unique: true })
  nis: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  class: string

  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  @Prop({ default: 'student' })
  role: string

  @Prop({ default: '' })
  status: string

  @Prop({ default: '' })
  photo: string  // 🔥 TAMBAHAN UNTUK FOTO

  @Prop({
    type: [
      {
        date: Date,
        status: String,
        method: String,
      },
    ],
    default: [],
  })
  attendanceHistory: {
    date: Date
    status: string
    method: string
  }[]
}

export const StudentSchema = SchemaFactory.createForClass(Student)
