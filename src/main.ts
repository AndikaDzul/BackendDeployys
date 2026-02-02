import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 🔥 TAMBAHAN PENTING
  app.setGlobalPrefix('api') // semua route diawali /api

  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // hanya property DTO yang diterima
      transform: true, // otomatis convert types
    }),
  )

  await app.listen(3000)
  console.log('🚀 Backend running http://localhost:3000')
  console.log('👉 API Prefix: /api')
}

bootstrap()
