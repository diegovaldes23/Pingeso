# Usa una imagen base de OpenJDK para el runtime
FROM openjdk:17-jdk-slim

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala netcat para usar wait-for-it.sh
RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Copia el script `wait-for-it.sh` y dale permisos de ejecución
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Copia el archivo JAR generado al contenedor
COPY target/confitescordova-0.0.1-SNAPSHOT.jar app.jar

# Expone el puerto de tu backend (por ejemplo, 8080)
EXPOSE 8080

# Configura el ENTRYPOINT para esperar a que el servicio de base de datos esté listo
ENTRYPOINT ["/wait-for-it.sh", "db:3306", "--", "java", "-jar", "app.jar"]
