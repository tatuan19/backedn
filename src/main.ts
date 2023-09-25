import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: `http://${process.env.FRONTEND_HOST}:${process.env.FRONTEND_PORT}`,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Api-Key',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
    ],
  });

  config();

  await app.listen(3000);
}
bootstrap();
