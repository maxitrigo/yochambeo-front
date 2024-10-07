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

# Usar una imagen de Nginx para servir la aplicación
FROM nginx:latest

# Copiar los archivos de la build de Vite al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar el archivo de configuracion de Nginx
COPY nginx.conf /etc/nginx/nginx.conf 

# Exponer el puerto por defecto de Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]