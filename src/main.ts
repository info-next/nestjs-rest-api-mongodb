import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.useGlobalFilters(new AllExceptionsFilter());
  const config = new DocumentBuilder()
  .setTitle('E-learning')
  .setDescription('E-learning API COllection')
  .setVersion('1.0')
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  await app.listen(8170);
}
bootstrap();
