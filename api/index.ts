import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

// Inisialisasi Express
const server = express();

export const createNextServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  
  app.enableCors();
  // PENTING: Jangan gunakan app.listen()
  await app.init();
};

createNextServer(server);

// Export server untuk digunakan Vercel
export default server;