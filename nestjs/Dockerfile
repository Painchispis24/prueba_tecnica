# Etapa 1: Build
FROM node:18 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Runtime
FROM node:18

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/.env .env 

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main"]
