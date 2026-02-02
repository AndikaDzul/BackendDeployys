import { Injectable, NotFoundException } from '@nestjs/common'
import { StudentsService } from '../students/students.service'

@Injectable()
export class FaceService {
  constructor(private readonly studentsService: StudentsService) {}

  async recognizeFace(nis: string, photoFilename?: string) {
    const student = await this.studentsService.findByNis(nis)

    if (!student) {
      throw new NotFoundException('Siswa tidak dikenali')
    }

    // Update status + simpan foto
    return await this.studentsService.updateStatus(nis, 'Hadir', photoFilename)
  }
}
