import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { AuthModule } from './modules/auth.module';


async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    stopAtFirstError: true
  }))
  await app.listen(3000);
}
bootstrap();
