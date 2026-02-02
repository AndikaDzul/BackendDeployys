import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Student, StudentDocument } from './students.schema'

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name)
    private studentModel: Model<StudentDocument>,
  ) {}

  async create(data: Partial<Student>): Promise<Student> {
    return new this.studentModel(data).save()
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec()
  }

  async findByNis(nis: string): Promise<Student | null> {
    return this.studentModel.findOne({ nis }).exec()
  }

  async updateStatus(nis: string, status: string, photo?: string): Promise<Student> {
    const student = await this.studentModel.findOne({ nis })
    if (!student) throw new NotFoundException('Siswa tidak ditemukan')

    // Anti dobel absen hari yang sama
    const today = new Date().toDateString()
    const already = student.attendanceHistory.find(
      h => new Date(h.date).toDateString() === today && h.method === 'face'
    )
    if (already) {
      throw new BadRequestException('Siswa sudah absen hari ini')
    }

    student.status = status
    if (photo) student.photo = photo // simpan nama file foto

    student.attendanceHistory.push({
      date: new Date(),
      status,
      method: 'face',
    })

    return student.save()
  }

  async resetStatus(nis: string): Promise<Student> {
    const student = await this.studentModel.findOne({ nis })
    if (!student) throw new NotFoundException('Siswa tidak ditemukan')

    student.status = ''
    student.attendanceHistory.push({
      date: new Date(),
      status: 'Reset',
      method: 'system',
    })

    return student.save()
  }

  async deleteByNis(nis: string) {
    const result = await this.studentModel.deleteOne({ nis })
    if (result.deletedCount === 0) {
      throw new NotFoundException('Siswa tidak ditemukan')
    }
    return { message: 'Siswa berhasil dihapus' }
  }
}
