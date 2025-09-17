import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { validationPipe } from './common/pipes/validation-pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(validationPipe);
  app.useGlobalFilters(new GlobalExceptionFilter());
  await app.listen(3000);
}

bootstrap();
