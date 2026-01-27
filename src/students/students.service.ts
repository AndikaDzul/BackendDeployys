import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Student, StudentDocument } from './students.schema'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class StudentsService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
    private jwtService: JwtService
  ) {}

  // REGISTER siswa
  async create(data: { nis: string; name: string; class: string; email: string; password: string }) {
    const existing = await this.studentModel.findOne({ email: data.email })
    if (existing) throw new BadRequestException('Email sudah terdaftar')

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const student = new this.studentModel({ ...data, password: hashedPassword })
    return student.save()
  }

  // LOGIN siswa
  async login(email: string, password: string) {
    const student = await this.studentModel.findOne({ email })
    if (!student) throw new UnauthorizedException('Email tidak terdaftar')

    const isMatch = await bcrypt.compare(password, student.password)
    if (!isMatch) throw new UnauthorizedException('Password salah')

    const payload = { sub: student._id, email: student.email, role: student.role }
    const token = this.jwtService.sign(payload)

    return {
      message: 'Login berhasil',
      token,
      studentId: student._id,
      name: student.name,
      email: student.email,
      class: student.class,
      role: student.role
    }
  }

  // CRUD lama
  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec()
  }

  async deleteByNis(nis: string): Promise<any> {
    return this.studentModel.deleteOne({ nis }).exec()
  }
}
