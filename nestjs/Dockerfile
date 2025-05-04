# Etapa 1: Build
FROM node:18 AS builder

WORKDIR /usr/src/app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente
COPY . .

# Compila la aplicación NestJS
RUN npm run build

# Etapa 2: Runtime
FROM node:18

WORKDIR /usr/src/app

# Copia solo lo necesario desde la etapa anterior
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expón el puerto que usa NestJS
EXPOSE 3000

# Comando por defecto
CMD ["node", "dist/main"]
