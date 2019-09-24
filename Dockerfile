# Keep hub.Dockerfile aligned to this file as far as possible

ARG base=hmctspublic.azurecr.io/base/node/stretch-slim-lts-8:8-stretch-slim

# ---- Build artifacts ----
# Both frontend and backend codebases are bundled from their
# .ts source into .js, producing self-sufficient scripts.
FROM ${base} AS build
USER root
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    bzip2=1.0.6-8.1 \
    patch=2.7.5-1+deb9u2 \
    libfontconfig1=2.11.0-6.7+b1 \
    && rm -rf /var/lib/apt/lists/*
USER hmcts
COPY package.json yarn.lock .snyk bin ./
RUN yarn install
COPY . .
RUN yarn build:ssr
# ---- Unfold build:ssr ----
RUN find ./node_modules/@hmcts/media-viewer/ -type f -name '*.js' -exec sed -i "s|printWindow.print();|;|g" {} +;
RUN sed -i "s|@error \"Unknown colour \`#{\$colour}\`\";|@return \$colour;|g" ./node_modules/@hmcts/media-viewer/assets/govuk-frontend/helpers/_colour.scss
RUN npm run build:client-and-server-bundles
RUN npm run webpack:server
RUN sed -i "s|@hmcts/media-viewer;|'@hmcts/media-viewer';|g" ./dist/server.js

# ---- Runtime image ----
FROM ${base} AS runtime
COPY --from=build ${WORKDIR}/dist/ ./
CMD node ./server.js
