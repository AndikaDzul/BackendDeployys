import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema({ timestamps: true })
export class Attendance {
  @Prop()
  nis: string;

  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop()
  time: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
