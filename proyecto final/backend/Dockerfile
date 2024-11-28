# Utiliza una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json tsconfig.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Compila el código TypeScript
RUN npm run build

# Expon el puerto de la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "build/server.js"]
