import * as dotenv from 'dotenv-safe';

dotenv.config({ allowEmptyValues: true });

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { HttpExceptionFilter } from './common/exception-filters/global.exception-filter';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseTransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix(`${process.env.API_PREFIX}/${process.env.VERSION}`);

  const options = new DocumentBuilder()
    .setTitle('Diet Tool SERVER')
    .setDescription('Diet Tool backend')
    .setVersion('1.0')
    .addServer('', 'Local')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  const port = process.env.PORT || 3000;
  await app.listen(port);
  new Logger().log(`Server started on Port ${port}`);
}
bootstrap();
