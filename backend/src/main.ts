import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import helmet from "helmet";
import {ValidationPipe, VersioningType} from "@nestjs/common";
import {CustomLogger} from "./modules/logger/logger.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Logging
  app.useLogger(app.get(CustomLogger));

  // Security
  app.enableCors();
  app.use(helmet());

  // Validation
  app.useGlobalPipes(new ValidationPipe());

  // Api versioning
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // ApiDoc
  const config = new DocumentBuilder()
      .setTitle('Export-Import REST Api')
      .setDescription('Simple API for exporting and importing documents')
      .setVersion('1.0')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
