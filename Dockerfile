# ---- Base Image ----
FROM node:8.12.0-slim AS base
WORKDIR /usr/src/app
ARG BUILD_DEPS='bzip2 patch libfontconfig'
RUN apt-get update \
    && apt-get install -y $BUILD_DEPS --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*
# ---- Dependencies ----
# This image has all dependencies for all build tasks, frontend,
# backend, unit tests, and even selenium test runner/webdrivers.
# It can be used as a base image for any build or test run.
FROM base AS dependencies
COPY package.json yarn.lock .snyk ./
RUN yarn install
# ---- Copy source files ----
# This image can be used for different codebase-related
# tasks like unit tests or code quality checks.
FROM dependencies AS with-source
COPY . .
# ---- Build artifacts ----
# Both frontend and backend codebases are bundled from their
# .ts source into .js, producing self-sufficient scripts.
# Notice the nodejs codebase build also incorporates its
# own dependencies bundled within a single file.
FROM with-source AS build
RUN yarn build:ssr
# ---- Runtime image ----
# Starting from a fresh node base image: no need for another
# npm install as the built artifacts have their dependencies
# built-in already, as stated above.
FROM node:8.12.0-slim AS runtime
WORKDIR /usr/src/app/dist
COPY --from=build /usr/src/app/dist/ ./
CMD node ./server.js
