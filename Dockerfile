FROM node:8

MAINTAINER Ferdinand Swoboda

# Pallet standard locations
VOLUME ["/static", "/storage"]
RUN useradd -d /app -r app && \
    mkdir -p /static /storage /app && \
    chown -R app /static /storage /app

WORKDIR /app

# Install Debian packages
RUN \
    apt-get -y update && \
    apt-get -y --no-install-recommends install \
        nginx \
        parallel \
        git \
        sudo \
        wget \
        build-essential \
        python \
        libelf-dev \
        && \
    echo "Cleaning up" && \
    rm -rf /var/lib/apt/lists/*

# Install the npm deps
COPY package.json npm-shrinkwrap.json bower.json /app/
RUN npm install && \
    npm cache clean --force && \
    $(npm bin)/bower install --allow-root

# Install and build the app
COPY . /app

RUN script/build-assets && \
    script/build-gmaps-file && \
    chown -R app .

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
    && ln -sf /dev/stderr /var/log/nginx/error.log

RUN mkdir -p /usr/share/nginx/conf/
RUN cp /app/conf/nginx.conf /usr/share/nginx/conf/nginx.conf

ENTRYPOINT ["./invoke.sh"]
EXPOSE 8000
