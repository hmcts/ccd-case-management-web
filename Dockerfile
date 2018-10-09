FROM node:8.12.0-slim

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN apk add patch

COPY package.json yarn.lock .snyk /usr/src/app/
RUN yarn install

RUN apk del patch

COPY . /usr/src/app/

RUN yarn build:ssr

WORKDIR /usr/src/app/dist
CMD node ./server.js
