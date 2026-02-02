// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ===== MODULES APLIKASI =====
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { AuthModule } from './auth/auth.module';
import { AdminsModule } from './admins/admins.module';
import { FaceModule } from './face/face.module';
import { AttendanceModule } from './attendance/attendance.module'; // ✅ TAMBAHAN

@Module({
  imports: [
    // membaca file .env secara global
    ConfigModule.forRoot({ isGlobal: true }),

    // koneksi ke MongoDB secara async
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    // modules aplikasi
    StudentsModule,
    TeachersModule,
    AuthModule,
    AdminsModule,
    FaceModule,
    AttendanceModule, // ✅ TAMBAH DI AKHIR
  ],
})
export class AppModule {}
