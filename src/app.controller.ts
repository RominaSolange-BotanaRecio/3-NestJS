import { Controller, Get, Post, Body, Param, ParseIntPipe, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { AppService } from './app.service';
import { EchoDto } from './dto/echo.dto';
import { GetUserDto } from './dto/user.dto';

@ApiTags('api')
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Página principal del cliente' })
  @ApiResponse({ status: 200, description: 'Página HTML del cliente' })
  getHello(): string {
    this.logger.log('Acceso a la página principal del cliente');
    return this.appService.getHello();
  }

  @Get('api/status')
  @ApiTags('status')
  @ApiOperation({ summary: 'Obtener estado del servidor' })
  @ApiResponse({ 
    status: 200, 
    description: 'Estado del servidor',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'OK' },
        timestamp: { type: 'string', example: '2024-01-01T00:00:00.000Z' },
        message: { type: 'string' },
        port: { type: 'number', example: 3000 },
        environment: { type: 'string', example: 'development' }
      }
    }
  })
  getStatus() {
    this.logger.log('Consulta de estado del servidor');
    return {
      status: 'OK',
      timestamp: new Date().toISOString(),
      message: 'Servidor NestJS funcionando correctamente',
      port: process.env.PORT || 3000,
      environment: process.env.NODE_ENV || 'development'
    };
  }

  @Get('api/info')
  @ApiTags('api')
  @ApiOperation({ summary: 'Obtener información de la API' })
  @ApiResponse({ 
    status: 200, 
    description: 'Información detallada de la API',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Backend Olavarría' },
        version: { type: 'string', example: '1.0.0' },
        description: { type: 'string' },
        features: { type: 'array', items: { type: 'string' } },
        endpoints: { type: 'array', items: { type: 'string' } }
      }
    }
  })
  getInfo() {
    this.logger.log('Consulta de información de la API');
    return {
      name: 'Backend Olavarría',
      version: '1.0.0',
      description: 'API REST con NestJS',
      features: [
        'Validación de datos con class-validator',
        'DTOs para type safety',
        'Middleware de seguridad (Helmet)',
        'Compresión Gzip',
        'CORS habilitado',
        'Variables de entorno',
        'Rate limiting',
        'Logging avanzado con Winston',
        'Manejo global de errores',
        'Documentación automática con Swagger'
      ],
      endpoints: [
        'GET /api/status - Estado del servidor',
        'GET /api/info - Información de la API',
        'POST /api/echo - Echo de mensajes (con validación)',
        'GET /api/users/:id - Usuario por ID (con validación)',
        'GET /api/docs - Documentación Swagger'
      ]
    };
  }

  @Post('api/echo')
  @ApiTags('api')
  @ApiOperation({ summary: 'Echo de mensajes con validación' })
  @ApiResponse({ 
    status: 201, 
    description: 'Mensaje echo recibido y validado',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: { type: 'object' },
        timestamp: { type: 'string' },
        validation: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  echo(@Body() echoDto: EchoDto) {
    this.logger.log(`Echo recibido: ${echoDto.message}`, { user: echoDto.name });
    return {
      message: 'Echo recibido y validado correctamente',
      data: echoDto,
      timestamp: new Date().toISOString(),
      validation: '✅ Datos validados con class-validator'
    };
  }

  @Get('api/users/:id')
  @ApiTags('users')
  @ApiOperation({ summary: 'Obtener usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: 1 })
  @ApiResponse({ 
    status: 200, 
    description: 'Usuario encontrado',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'Usuario Ejemplo' },
        email: { type: 'string', example: 'usuario@ejemplo.com' },
        createdAt: { type: 'string' },
        validation: { type: 'string' }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'ID inválido' })
  getUser(@Param('id', ParseIntPipe) id: number) {
    this.logger.log(`Consulta de usuario con ID: ${id}`);
    return {
      id: id,
      name: 'Usuario Ejemplo',
      email: 'usuario@ejemplo.com',
      createdAt: new Date().toISOString(),
      validation: '✅ ID validado como número entero'
    };
  }
}
