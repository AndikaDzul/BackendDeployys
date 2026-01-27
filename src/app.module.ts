import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { JwtModule } from '@nestjs/jwt'

import { StudentsModule } from './students/students.module'
import { AuthModule } from './auth/auth.module'
import { SchedulesModule } from './schedules/schedules.module'
import { TeachersModule } from './teachers/teachers.module'

@Module({
  imports: [
    // Config global
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Koneksi MongoDB
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
      }),
    }),

    // Module aplikasi
    StudentsModule,
    AuthModule,
    SchedulesModule,
    TeachersModule,

    // JWT global (opsional, bisa diimport di TeachersModule juga)
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'RAHASIA_JWT_MU', // ganti sesuai env
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class AppModule {}
