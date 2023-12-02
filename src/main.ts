import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { config } from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const originPort =
    process.env.FRONTEND_PORT === '80' ? '' : `:${process.env.FRONTEND_PORT}`;
  app.enableCors({
    origin: `http://${process.env.FRONTEND_HOST}${originPort}`,
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE'],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
    ],
  });

  config();

  await app.listen(3000);
}
bootstrap();
