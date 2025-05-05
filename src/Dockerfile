FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev zip unzip git curl libzip-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . /var/www
COPY .env /var/www/.env

RUN composer install --optimize-autoloader

RUN php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"

RUN php artisan key:generate
RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
