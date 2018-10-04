FROM node:8-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock /usr/src/app/
RUN yarn install

COPY . /usr/src/app/

RUN yarn build:ssr

WORKDIR /usr/src/app/dist
CMD node ./server.js
