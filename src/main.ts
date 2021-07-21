import { NestFactory } from '@nestjs/core';
import ApplicationModule from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { WsAdapter } from '@nestjs/platform-ws';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);

  const config = new DocumentBuilder()
  .setTitle('Coffee Sho API')
  .setDescription('Api responsible for coffee shop operations')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useWebSocketAdapter(new WsAdapter(app));

  await app.listen(3000);
}

bootstrap();
