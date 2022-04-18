import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {Logger} from '@nestjs/common'

const log = new Logger('Bigway')

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 10000);
  app.enableCors({credentials: true, origin: process.env.CLIENT || 'http://localhost:3000'})
  log.log(process.env.PORT || 10000 + " is now running.")
}
bootstrap();
