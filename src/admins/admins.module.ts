import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { Admin, AdminSchema } from './admin.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'RAHASIA_JWT_MU',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AdminsController],
  providers: [AdminsService],
  exports: [AdminsService],
})
export class AdminsModule {}
