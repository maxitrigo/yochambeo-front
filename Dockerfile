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

# Usar una imagen base de Nginx
FROM nginx:stable-alpine

# Copiar el archivo de configuración de Nginx
COPY ./nginx.conf /etc/nginx/conf.d/

# Verificar que el archivo se haya copiado correctamente
RUN ls -l /etc/nginx/conf.d/

# Copiar los archivos de la build de Vite al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html


# Asegurarse de que Nginx esté ejecutándose en primer plano
CMD ["nginx", "-g", "daemon off;"]