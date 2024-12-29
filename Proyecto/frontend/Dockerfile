# Usa una imagen base de Node.js para construir el frontend
FROM node:18 AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código fuente al contenedor
COPY . .

# Instala las dependencias
RUN npm install

# Construye el frontend
RUN npm run build

# Usa una imagen ligera de Nginx para servir los archivos estáticos
FROM nginx:alpine

# Copia los archivos estáticos generados al directorio de Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Expone el puerto del servidor Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
