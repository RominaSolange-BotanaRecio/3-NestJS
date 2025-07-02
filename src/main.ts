import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  
  // Configurar CORS
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Configurar prefijo global para API
  app.setGlobalPrefix('api');

  // Middleware de seguridad
  app.use(helmet());
  
  // Compresión gzip
  app.use(compression());

  // Validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend Olavarría API')
    .setDescription('API REST construida con NestJS para el proyecto Backend Olavarría')
    .setVersion('1.0')
    .addTag('api')
    .addTag('status')
    .addTag('users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  
  try {
    await app.listen(port);
    
    logger.log('🚀 ========================================');
    logger.log('🚀 Backend Olavarría - NestJS iniciado');
    logger.log('🚀 ========================================');
    logger.log(`📍 Puerto: ${port}`);
    logger.log(`🌐 Cliente: http://localhost:${port}`);
    logger.log(`🔗 API: http://localhost:${port}/api`);
    logger.log(`📚 Swagger: http://localhost:${port}/api/docs`);
    logger.log(`🛡️  Seguridad: Helmet habilitado`);
    logger.log(`🗜️  Compresión: Gzip habilitado`);
    logger.log(`✅ Validación: Global habilitada`);
    logger.log(`🚦 Rate Limiting: 100 req/min`);
    logger.log(`📝 Logging: Winston configurado`);
    logger.log(`🎯 Entorno: ${process.env.NODE_ENV || 'development'}`);
    logger.log('🚀 ========================================');
    
  } catch (error) {
    logger.error('❌ Error al iniciar el servidor:', error);
  }
}
bootstrap();
