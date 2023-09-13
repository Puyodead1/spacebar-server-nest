import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';
import { I18nExceptionFilter } from './lib/I18nExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '9',
    prefix: 'v',
  });

  app.useGlobalFilters(new I18nExceptionFilter());

  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Spacebar')
    .setDescription('Spacebar API')
    .setVersion('0.1.0')
    .addTag('auth')
    .addTag('user')
    .addTag('channel')
    .addTag('guild')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
