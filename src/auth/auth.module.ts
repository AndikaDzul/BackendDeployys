import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { TeachersModule } from '../teachers/teachers.module'

@Module({
  imports: [
    TeachersModule, // ⬅️ INI WAJIB
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
