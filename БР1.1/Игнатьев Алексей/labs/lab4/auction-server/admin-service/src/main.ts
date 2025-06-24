import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import metadata from 'src/metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cfg = new DocumentBuilder()
    .setTitle('Admin-server')
    .setDescription('The API description')
    .setVersion('0.0.1')
    .addBasicAuth({ type: 'http', in: 'header' }, 'Basic')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', in: 'header', bearerFormat: 'JWT' },
      'Bearer',
    )
    .build();
  // await SwaggerModule.loadPluginMetadata(metadata);
  const document = SwaggerModule.createDocument(app, cfg);
  // app.use('/api', new SwaggerAuthMiddleware().use);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.ADMIN_SERVICE_PORT ?? 3000);
}
bootstrap();
