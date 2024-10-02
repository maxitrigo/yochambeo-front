# Usa la imagen de Node.js
FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Construye la aplicación
RUN npm run build

# Usa una imagen ligera para servir
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
