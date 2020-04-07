FROM php:7.4-fpm

RUN apt-get update \
&& apt-get install -y locales

# Locale
RUN sed -i -e \
's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
&& locale-gen

ENV LANG ru_RU.UTF-8
ENV LANGUAGE ru_RU:ru
ENV LC_LANG ru_RU.UTF-8
ENV LC_ALL ru_RU.UTF-8

# Timezone
ENV TZ Europe/MoscowRUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get install -y \
mc \
libzip-dev \
libfreetype6-dev \
libjpeg62-turbo-dev \
libmcrypt-dev \
libpng-dev \
libsqlite3-dev \
libcurl4-gnutls-dev \
libonig-dev \
&& apt-get install git -y \
&& apt-get install -y libmcrypt-dev mariadb-client \
&& pecl install mcrypt-1.0.3 \
&& docker-php-ext-install -j$(nproc) iconv pdo_mysql gd zip curl bcmath opcache mbstring \
&& docker-php-ext-configure gd --with-freetype --with-jpeg \
&& docker-php-ext-install -j$(nproc) gd \
&& docker-php-ext-enable iconv mcrypt pdo_mysql gd zip curl bcmath opcache mbstring \
&& apt-get autoremove -y

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

RUN apt-get update && apt-get install -y libmagickwand-6.q16-dev --no-install-recommends \
&& ln -s /usr/lib/x86_64-linux-gnu/ImageMagick-6.8.9/bin-Q16/MagickWand-config /usr/bin \
&& pecl install imagick-3.4.3

WORKDIR /var/www/html