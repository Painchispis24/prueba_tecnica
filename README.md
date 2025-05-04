# PRUEBA TECNICA:

De Ayala Mendoza, Gerald Eduardo

Para el levantamiento de los contenedores, en el archivo raiz ejecutar:

docker-compose up --build

Automaticamente se corren los 2 servicios tanto de Nest js y de Laravel.

✏️ Para Laravel: 

Estando dentro del contenedor

Instalar las dependencias de Swagger:

composer require "darkaonline/l5-swagger"
php artisan vendor:publish --provider "L5Swagger\L5SwaggerServiceProvider"

Se trabajó con un middleware para autenticar las peticiones. 
En la ruta:
http://localhost:8000/api/login
Y en el body se manda estos datos:

email: usu_1@gmail.com
password: usu123usu

Devolverá un token con el podremos hacer las peticiones que se han pedido: crear cuenta, listar, transacciones, etc.

✏️ Para Nest: 

Estando dentro del contenedor

Instalar las dependencias:

npm install @nestjs/typeorm typeorm pg
npm install @nestjs/swagger swagger-ui-express class-validator class-transformer
npm install @nestjs/config

Y en mi caso el CLI que necesité para generar más recursos:
npm install -g @nestjs/cli

