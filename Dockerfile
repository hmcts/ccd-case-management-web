# Keep hub.Dockerfile aligned to this file as far as possible

FROM hmctspublic.azurecr.io/base/node:12-alpine as base

COPY --chown=hmcts:hmcts package.json yarn.lock .snyk bin ./

# ---- Build artifacts ----
# Both frontend and backend codebases are bundled from their
# .ts source into .js, producing self-sufficient scripts.
FROM base AS build

USER root
RUN apk update \
    && apk add bzip2 patch fontconfig \
    && rm -rf /var/lib/apt/lists/*
USER hmcts

RUN yarn install

COPY --chown=hmcts:hmcts . .
RUN /bin/sh -c yarn build:ssr

# ---- Runtime image ----
FROM base AS runtime
COPY --from=build ${WORKDIR} ./
CMD node ./server.js
