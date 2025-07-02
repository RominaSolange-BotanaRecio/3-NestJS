# 🚀 Backend Olavarría - NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
  <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
</p>

Un servidor backend moderno y profesional construido con NestJS que incluye una interfaz web para probar la API.

## 📋 Características Profesionales

- ✅ **NestJS Framework** - Framework Node.js progresivo
- ✅ **TypeScript** - Tipado estático para mejor desarrollo
- ✅ **API REST** - Endpoints para pruebas y desarrollo
- ✅ **Cliente Web** - Interfaz HTML/CSS/JS para probar la API
- ✅ **CORS habilitado** - Para desarrollo frontend
- ✅ **Puerto 3000** - Configurado por defecto
- ✅ **Hot Reload** - Recarga automática en desarrollo
- ✅ **Variables de Entorno** - Configuración flexible con @nestjs/config
- ✅ **Validación Profesional** - DTOs con class-validator
- ✅ **Documentación Automática** - Swagger UI integrado
- ✅ **Manejo Global de Errores** - Filtros de excepción
- ✅ **Rate Limiting** - Protección contra abusos (100 req/min)
- ✅ **Logging Avanzado** - Winston con archivos de log
- ✅ **Seguridad** - Helmet middleware
- ✅ **Compresión** - Gzip para mejor rendimiento

## 🛠️ Instalación

1. **Instalar dependencias:**
```bash
npm install
```

2. **Configurar variables de entorno:**
```bash
# Crear archivo .env basado en .env.example
PORT=3000
NODE_ENV=development
```

3. **Ejecutar en modo desarrollo:**
```bash
npm run start:dev
```

4. **Ejecutar en modo producción:**
```bash
npm run build
npm run start:prod
```

## 🌐 Acceso

Una vez ejecutado, puedes acceder a:

- **Cliente Web:** http://localhost:3000
- **API Status:** http://localhost:3000/api/status
- **API Info:** http://localhost:3000/api/info
- **Documentación Swagger:** http://localhost:3000/api/docs

## 📡 Endpoints de la API

### GET /api/status
Obtiene el estado del servidor
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Servidor NestJS funcionando correctamente",
  "port": 3000,
  "environment": "development"
}
```

### GET /api/info
Información detallada sobre la API
```json
{
  "name": "Backend Olavarría",
  "version": "1.0.0",
  "description": "API REST con NestJS",
  "features": [
    "Validación de datos con class-validator",
    "DTOs para type safety",
    "Middleware de seguridad (Helmet)",
    "Compresión Gzip",
    "CORS habilitado",
    "Variables de entorno",
    "Rate limiting",
    "Logging avanzado con Winston",
    "Manejo global de errores",
    "Documentación automática con Swagger"
  ],
  "endpoints": [...]
}
```

### POST /api/echo
Echo de mensajes con validación
```json
// Request
{
  "message": "Hola desde el cliente!",
  "name": "Juan Pérez"
}

// Response
{
  "message": "Echo recibido y validado correctamente",
  "data": { "message": "Hola desde el cliente!", "name": "Juan Pérez" },
  "timestamp": "2024-01-01T00:00:00.000Z",
  "validation": "✅ Datos validados con class-validator"
}
```

### GET /api/users/:id
Obtiene información de un usuario por ID
```json
{
  "id": 1,
  "name": "Usuario Ejemplo",
  "email": "usuario@ejemplo.com",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "validation": "✅ ID validado como número entero"
}
```

## 🎨 Interfaz Web

El proyecto incluye una interfaz web moderna con:

- ✨ Diseño responsive y atractivo
- 🧪 Pruebas interactivas de la API
- 📊 Información del servidor
- 🎯 Interfaz intuitiva
- 🔄 Actualización automática de resultados

## 📁 Estructura del Proyecto

```
back-end-nest-js/
├── src/
│   ├── dto/                    # Data Transfer Objects
│   │   ├── echo.dto.ts         # Validación para echo
│   │   └── user.dto.ts         # Validación para usuarios
│   ├── filters/                # Filtros globales
│   │   └── http-exception.filter.ts
│   ├── app.controller.ts       # Controlador principal
│   ├── app.service.ts          # Servicios
│   ├── app.module.ts           # Módulo principal
│   └── main.ts                 # Punto de entrada
├── client/
│   ├── index.html              # Página principal
│   └── css/
│       └── style.css           # Estilos
├── logs/                       # Archivos de log
│   ├── error.log              # Logs de errores
│   └── combined.log           # Logs combinados
├── test/                       # Tests
├── start.bat                   # Script de inicio (Windows)
└── package.json               # Dependencias
```

## 🚀 Scripts Disponibles

- `npm run start` - Inicia el servidor
- `npm run start:dev` - Inicia en modo desarrollo con hot reload
- `npm run start:debug` - Inicia en modo debug
- `npm run start:prod` - Inicia en modo producción
- `npm run build` - Compila el proyecto
- `npm run test` - Ejecuta tests
- `npm run lint` - Ejecuta el linter

## 🔧 Configuración

### Variables de Entorno
Crea un archivo `.env` en la raíz del proyecto:

```env
PORT=3000
NODE_ENV=development
```

### Rate Limiting
- **Límite:** 100 requests por minuto
- **Configuración:** En `app.module.ts`

### Logging
- **Consola:** Logs coloridos en desarrollo
- **Archivos:** `logs/error.log` y `logs/combined.log`
- **Niveles:** error, warn, info, debug

## 🛡️ Seguridad

- **Helmet:** Headers de seguridad
- **CORS:** Configurado para desarrollo
- **Rate Limiting:** Protección contra abusos
- **Validación:** Todos los inputs validados
- **Sanitización:** Datos limpios automáticamente

## 📝 Desarrollo

### Agregar nuevos endpoints:

1. **Crear DTO** en `src/dto/`
2. **Agregar método** en `app.controller.ts`
3. **Documentar** con decoradores de Swagger
4. **El servidor se recarga automáticamente**

### Ejemplo de nuevo endpoint:

```typescript
@Post('api/example')
@ApiOperation({ summary: 'Nuevo endpoint' })
@ApiResponse({ status: 201, description: 'Creado exitosamente' })
async createExample(@Body() dto: ExampleDto) {
  this.logger.log('Nuevo ejemplo creado');
  return { message: 'Ejemplo creado' };
}
```

## 📊 Monitoreo

### Logs
- **Consola:** Logs en tiempo real
- **Archivos:** `logs/combined.log` y `logs/error.log`
- **Formato:** JSON con timestamps

### Métricas
- **Rate Limiting:** Monitoreo de requests
- **Validación:** Errores de validación
- **Performance:** Tiempos de respuesta

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**¡Tu backend NestJS está listo para producción! 🎉**

### 🎯 Próximos pasos sugeridos:
- [ ] Integrar base de datos (TypeORM/Prisma)
- [ ] Autenticación JWT
- [ ] Tests unitarios y e2e
- [ ] Docker containerization
- [ ] CI/CD pipeline

## 📚 Recursos

- [Documentación de NestJS](https://docs.nestjs.com/)
- [Canal de Discord](https://discord.gg/G7Qnnhy)
- [Cursos oficiales](https://courses.nestjs.com/)
- [NestJS Devtools](https://devtools.nestjs.com/)

## 🆘 Soporte

NestJS es un proyecto de código abierto con licencia MIT. Puede crecer gracias a los sponsors y el apoyo de los increíbles patrocinadores. Si te gustaría unirte a ellos, [lee más aquí](https://docs.nestjs.com/support).

## 📞 Mantente en contacto

- Autor - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Sitio web - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)
