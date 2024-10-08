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

# Usa una imagen base de Apache
FROM httpd:alpine

# Copia el contenido de la carpeta dist al contenedor
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

# Copia el archivo .htaccess al contenedor
COPY ./.htaccess /usr/local/apache2/htdocs/

# Expone el puerto 80
EXPOSE 80