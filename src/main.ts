import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true
  });

  // Aplica nosso interceptor para padronizar a estrutura de retorno
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Ready Dice Roll!')
    .setDescription('APIs utilizadas no projeto Ready, Dice, Roll!')
    .setVersion('1.0')
    .addTag('ReadyDiceRoll')
    .build();

  app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, Authorization');
      res.sendStatus(204); // No Content
    } else {
      next();
    }
  });
  app.enableCors();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Rota onde o Swagger será acessível
  // if (process.env.NODE_ENV !== 'production') SwaggerModule.setup('api', app, document); // Rota onde o Swagger será acessível

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
