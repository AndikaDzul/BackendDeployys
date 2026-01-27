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

  @Prop({ required: true })
  email: string // tambahkan email untuk login

  @Prop({ required: true })
  password: string // password hash

  @Prop({ default: 'student' })
  role: string
}

export const StudentSchema = SchemaFactory.createForClass(Student)
