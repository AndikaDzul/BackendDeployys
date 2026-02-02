import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  NotFoundException,
  Body,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { FaceService } from './face.service'
import { extname } from 'path'

@Controller('face')
export class FaceController {
  constructor(private readonly faceService: FaceService) {}

  @Post('scan')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads', // folder untuk simpan foto
        filename: (_, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          cb(null, `${uniqueSuffix}${ext}`)
        },
      }),
      fileFilter: (_, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(new NotFoundException('Format file harus jpg/jpeg/png'), false)
        }
        cb(null, true)
      },
    }),
  )
  async scanFace(
    @UploadedFile() image: Express.Multer.File,
    @Body('nis') nis: string,
  ) {
    if (!image) throw new NotFoundException('Image tidak ditemukan')
    if (!nis) throw new NotFoundException('NIS tidak ditemukan')

    const student = await this.faceService.recognizeFace(nis, image.filename)

    return {
      nis: student.nis,
      name: student.name,
      class: student.class,
      status: student.status,
      photo: student.photo,
      time: new Date(),
    }
  }
}
