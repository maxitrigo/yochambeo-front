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

# Usa una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos construidos desde la fase anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80 para el servidor Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
