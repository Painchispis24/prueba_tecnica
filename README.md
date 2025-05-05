# PRUEBA TECNICA:

De Ayala Mendoza, Gerald Eduardo

Para el levantamiento de los contenedores, en el archivo raiz ejecutar:

docker-compose up --build -d

Automaticamente se corren los 2 servicios tanto de Nest js y de Laravel.
Y la base de datos en Postgres

Los seeders se pueden corre en ambos. 

Las migraciones solo estan en laravel, pasos: primero se corren las migraciones, y luego
o correr los seeders en nest con el comando 
npm run seed
o en laravel
php artisan db:seed

Se trabajó con un middleware para autenticar las peticiones con JWT. 
En la ruta:

En laravel:
http://localhost:8000/api/login

En nestjs:
http://localhost:3000/auth/login

Y en el body se manda estos datos:
(datos de seed de laravel) 
email: usu_1@gmail.com
(datos de seed de nest) 
email: usu_3@gmail.com
password: usu123usu

Para la acceder a la documentación de endpoints:

Laravel:
http://localhost:8000/api/documentation
NestJs:
http://localhost:3000/api/

Devuelve el token con JWT y se usa para autenticarse para las demás peticiones


