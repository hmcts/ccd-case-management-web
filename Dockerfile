# Keep hub.Dockerfile aligned to this file as far as possible

ARG base=hmctspublic.azurecr.io/base/node:12-alpine 

ARG inter=hmctspublic.azurecr.io/base/node:12-stretch-slim

# ---- Build artifacts ----
# Both frontend and backend codebases are bundled from their
# .ts source into .js, producing self-sufficient scripts.
FROM ${inter} AS build

USER root
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    bzip2=1.0.6-8.1 \
    patch=2.7.5-1+deb9u2 \
    libfontconfig1=2.11.0-6.7+b1 \
    git \
    && rm -rf /var/lib/apt/lists/*
RUN apt-get update && apt-get install \
    --no-install-recommends \
    --no-install-suggests \
    -y ca-certificates       
COPY --chown=hmcts:hmcts package.json yarn.lock .snyk bin ./
RUN chown hmcts yarn.lock
USER hmcts
RUN git config --global url."https://".insteadOf git://
RUN yarn install \
  && yarn cache clean
COPY . .
RUN yarn build:ssr

# ---- Runtime image ----
FROM ${base} AS runtime
COPY --from=build ${WORKDIR}/dist/ ./
CMD node ./server.js