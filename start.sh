#!/bin/bash

# 1. Configurar variables de entorno
export DATABASE_URL="postgresql://localhost:5432/mydatabase"
export PORT=3000

# 2. Instalar dependencias del backend
echo "Installing backend dependencies..."
cd backend || exit
npm install

# 3. Ejecutar migraciones para configurar la base de datos
echo "Running database migrations..."
npx typeorm migration:run -d src/data-source.js

# 4. Instalar dependencias del frontend
echo "Installing frontend dependencies..."
cd ../frontend || exit
npm install

# 5. Ejecutar la aplicación (Backend y Frontend)
echo "Starting the application..."
cd ../backend || exit
npm run start & # Ejecutar el backend en segundo plano

# Establecer el puerto para el frontend y ejecutar
export PORT=3001
cd ../frontend || exit
npm start # Ejecutar el frontend

# 6. Notificar que la aplicación está corriendo
echo "Application is now running!"
