#!/usr/bin/env bash
export DOLLAR='$'
envsubst < config.json.template > /usr/share/nginx/html/config
nginx -g "daemon off;"
