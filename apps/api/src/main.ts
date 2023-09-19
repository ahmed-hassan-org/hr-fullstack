/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { HttpExceptionFilter } from './app/core/exception/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  const globalPrefix = 'api';
  const port = process.env.PORT || 3000;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new HttpExceptionFilter());
  // app.useStaticAssets(path.join(__dirname, 'client'));
  // app.setBaseViewsDir(path.join(__dirname, 'client'));
  const config = new DocumentBuilder()
    .setTitle('HR Application')
    .setDescription('Hr application for demo with angular, reaact, nextjs')
    .setVersion('v1')
    .addTag('hr')
    .addBearerAuth(
      {
        description: 'add your generated token after login',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'Header',
      },
      'authorization'
    )
    .build();
  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
