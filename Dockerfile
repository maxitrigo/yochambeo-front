# Usar una imagen base para construir la aplicación
FROM node:20 AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos del proyecto
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Usar una imagen base de nginx
FROM nginx:stable-alpine


RUN sed -i '1idaemon off;' /etc/nginx/nginx.conf


COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx"]