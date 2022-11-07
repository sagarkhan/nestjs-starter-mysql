import * as dotenv from 'dotenv-safe';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config({ allowEmptyValues: true });
  const app = await NestFactory.create(AppModule);
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
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
