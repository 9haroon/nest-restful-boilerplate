import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { join } from 'path';
import * as cookieParser from 'cookie-parser';

function setApiDocs(app: INestApplication, path: string) {
  const config = new DocumentBuilder()
    .setTitle('Facebook API examples')
    .setDescription('The Facebook Graph API playground')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(path, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const nodeEnv = configService.get('NODE_ENV', 'development');
  const apiDocPath = 'docs';

  if ('development' === nodeEnv) {
    setApiDocs(app, apiDocPath);
  }
  app.use(cookieParser());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.enableCors();

  const port = configService.get('PORT') || '3000';
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`with ${nodeEnv} environment`);
  'development' === nodeEnv &&
    console.log(`Docs ${await app.getUrl()}/${apiDocPath}`);
}

bootstrap();
