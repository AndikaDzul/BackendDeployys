import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Teacher } from './teacher.schema'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel(Teacher.name)
    private teacherModel: Model<Teacher>,
    private jwtService: JwtService // ✅ sekarang tersedia
  ) {}

  // REGISTER
  async create(data: any) {
    const existing = await this.teacherModel.findOne({ email: data.email })
    if (existing) throw new BadRequestException('Email sudah terdaftar')

    const hashedPassword = await bcrypt.hash(data.password, 10)
    const teacher = new this.teacherModel({ ...data, password: hashedPassword })
    return teacher.save()
  }

  // LOGIN
  async login(email: string, password: string) {
    const teacher = await this.teacherModel.findOne({ email })
    if (!teacher) throw new UnauthorizedException('Email tidak terdaftar')

    const isMatch = await bcrypt.compare(password, teacher.password)
    if (!isMatch) throw new UnauthorizedException('Password salah')

    const payload = { sub: teacher._id, email: teacher.email, role: teacher.role }
    const token = this.jwtService.sign(payload)

    return {
      message: 'Login berhasil',
      token,
      teacherId: teacher._id,
      name: teacher.name,
      email: teacher.email,
      mapel: teacher.mapel,
      role: teacher.role,
    }
  }
}
