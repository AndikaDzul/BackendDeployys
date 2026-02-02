import { Module } from '@nestjs/common'
import { FaceService } from './face.service'
import { FaceController } from './face.controller'
import { StudentsModule } from '../students/students.module'

@Module({
  imports: [StudentsModule],
  controllers: [FaceController],
  providers: [FaceService],
})
export class FaceModule {}
