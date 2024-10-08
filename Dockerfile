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

# # Usa una imagen base de Apache
# FROM httpd:2.4 as production-stage

# COPY apache-config.conf /usr/local/apache2/conf/httpd.conf

# COPY .htaccess /usr/local/apache2/htdocs/

# # Copia el contenido de la carpeta dist al contenedor
# COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# # Expone el puerto 80
# EXPOSE 80

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]