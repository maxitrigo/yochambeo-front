# Usa una imagen de Node.js para construir el proyecto
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build