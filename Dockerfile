FROM node:8.11.1 as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN ls -lash /usr/src/app

RUN yarn install
RUN yarn build

FROM nginx:1.13.7

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy our default nginx config
COPY docker/nginx/default.conf /etc/nginx/conf.d/

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

COPY docker/config.json.template config.json.template
COPY docker/run_nginx.sh run_nginx.sh
RUN chmod +x run_nginx.sh

CMD "./run_nginx.sh"
