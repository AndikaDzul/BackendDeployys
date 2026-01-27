import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'
import { StudentsService } from './students.service'
import { StudentsController } from './students.controller'
import { Student, StudentSchema } from './students.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'RAHASIA_JWT_MU',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [StudentsController],
  providers: [StudentsService],
  exports: [StudentsService],
})
export class StudentsModule {}
