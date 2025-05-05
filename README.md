# PRUEBA TECNICA:

De Ayala Mendoza, Gerald Eduardo

Para el levantamiento de los contenedores, en el archivo raiz ejecutar:

docker-compose up --build -d

Automaticamente se corren los 2 servicios tanto de Nest js y de Laravel.
Y la base de datos en Postgres

Los seeders se corren para ambos

Pero las migraciones solo estan en laravel, se recomienda que primero se corran las migraciones, y luego se decida 
o correr los seeders en nest o en laravel

Se trabajó con un middleware para autenticar las peticiones con JWT. 
En la ruta:

En laravel:
http://localhost:8000/api/login

En nestjs:
http://localhost:3000/auth/login

Y en el body se manda estos datos:
email: usu_1@gmail.com
password: usu123usu

Para la documentación de endpoints:

Laravel:
http://localhost:8000/api/documentation
NestJs:
http://localhost:3000/api/

Devuelve el token con JWT y se usa para autenticarse


