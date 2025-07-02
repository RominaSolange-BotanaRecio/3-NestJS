@echo off
echo ========================================
echo    🚀 Backend Olavarría - NestJS
echo ========================================
echo.

echo 📦 Verificando dependencias...
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
) else (
    echo Dependencias ya instaladas ✓
)

echo.
echo 🚀 Iniciando servidor en modo desarrollo...
echo 📍 Puerto: 3000
echo 🌐 Cliente: http://localhost:3000
echo 🔗 API: http://localhost:3000/api
echo.

cd back-end-nest-js; npm run start:dev

pause 