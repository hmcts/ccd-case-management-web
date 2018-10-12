FROM node:8.12.0-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

ARG BUILD_DEPS='bzip2 patch'

COPY package.json yarn.lock .snyk /usr/src/app/
RUN apt-get update && apt-get install -y $BUILD_DEPS --no-install-recommends \
    && rm -rf /var/lib/apt/lists/* \
    && yarn install

COPY . /usr/src/app/

RUN yarn build:ssr

RUN rm -rf node_modules \
    && yarn install --production \
    && apt-get purge -y --auto-remove $BUILD_DEPS

WORKDIR /usr/src/app/dist
CMD node ./server.js
