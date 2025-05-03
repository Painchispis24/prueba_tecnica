FROM php:8.2-fpm

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_pgsql

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Crear y usar directorio de trabajo
WORKDIR /var/www

# Instalar dependencias Laravel si aún no están
RUN composer global require laravel/installer

# Exponer el puerto 8000 (servidor Laravel)
EXPOSE 8000

# Comando por defecto: iniciar Laravel en el puerto 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
