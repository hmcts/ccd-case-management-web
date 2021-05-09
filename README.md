### ccd-case-management-web
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/hmcts/ccd-case-management-web.svg?branch=master)](https://travis-ci.org/hmcts/ccd-case-management-web)
[![Docker Build Status](https://img.shields.io/docker/build/hmcts/ccd-case-management-web.svg)](https://hub.docker.com/r/hmcts/ccd-case-management-web)
[![codecov](https://codecov.io/gh/hmcts/ccd-case-management-web/branch/master/graph/badge.svg)](https://codecov.io/gh/hmcts/ccd-case-management-web)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8375dcaa04594226a973d5cd44842713)](https://www.codacy.com/app/adr1ancho/ccd-case-management-web?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=hmcts/ccd-case-management-web&amp;utm_campaign=Badge_Grade)
[![HitCount](http://hits.dwyl.io/hmcts/ccd-case-management-web.svg)](#ccd-case-management-web)

An Angular front-end for Core Case Data

### Quick start
```bash
# install the dependencies with Yarn
$ yarn install

# (Optional) start the stub API
$ yarn stub-api

# start the development server
$ yarn start
```
go to [http://localhost:3451](http://localhost:3451) in your browser.

# Table of Contents

* [Getting Started](#getting-started)
    * [Prerequisites](#prerequisites)
    * [Install dependencies](#install-dependencies)
    * [Running](#running)
    * [Stubbing](#stubbing)
    * [Testing](#testing)
    * [Production](#production)
    * [Documentation](#documentation)
* [Seed](#seed)
* [Roadmap](#roadmap)
* [Environments](#environments)

# Getting Started

## Prerequisites

* [Node.js](https://nodejs.org/) >= v12.0.0
* [yarn](https://yarnpkg.com/)
* [Docker](https://www.docker.com)

### Environment variables

The following environment variables are required:

| Name | Description |
|------|-------------|
| IDAM_LOGIN_URL | URL for IdAM's login web page. `https://idam.dev.ccidam.reform.hmcts.net/login` for the `dev` instance. |
| CCD_GATEWAY_BASE_URL | Base URL for CCD API gateway. `https://case-api-gateway-web.dev.ccd.reform.hmcts.net` for the `dev` instance. |
| CCD_ACTIVITY_BASE_URL | Base URL for CCD Case Activity service. `https://case-activity-api.dev.ccd.reform.hmcts.net/health` for the `dev` instance. |
| DM_GATEWAY_BASE_URL | Base URL for Document Management gateway. `https://api-gateway.dev.dm.reform.hmcts.net` for the `dev` instance. |

Environment variables:

| Name | Description |
|------|-------------|
| CCD_ACTIVITY_NEXT_POLL_REQUEST_MS | Frequency of activity requests. A good setting for it is the value of ACTIVITY_TTL_SEC in the activity service backend (avoid setting it lower than ACTIVITY_TTL_SEC) |
| CCD_ACTIVITY_RETRY | Number of attempts in case of unsuccessful calls to Activity service |
| CCD_ACTIVITY_MAX_REQUEST_PER_BATCH | Max number of cases activity requests batched in a single activity call. A good setting for it is the value of CCD_PAGE_SIZE |
| CCD_ACTIVITY_BATCH_COLLECTION_DELAY_MS | Max delay before a batch activity call is issued. |

## Install dependencies

The project uses [yarn](https://yarnpkg.com/).

To install dependencies please execute the following command:

```bash
yarn install
```

## Running

Simply run:

```
yarn start
```

to start the Case Management app on [http://localhost:3451](http://localhost:3451).

As an alternative, you can work using Hot Module Replacement (HMR):

* `yarn start:hmr`

And you are all set! You can now modify your components on the fly without having to reload the entire page.

### Docker

If you want your code to become available to other Docker projects (e.g. for local environment testing), you need to build the app and then the Docker image:

```bash
yarn build
docker-compose build
```

You can run it by executing following command:

```bash
docker-compose up
```

As a result, the Case Management app will be started and made available on port `3451`.

## Stubbing

To facilitate development, a stub of **CCD Aggregated API** can be used instead of a real instance.
The stub API can be started with:

* `yarn stub-api`

It will start a JSON-Server instance at `http://localhost:3453`, serving the content of the `stubs/aggregated.api.json` file.

## Testing

### 1. Unit Tests

* single run: `yarn test`
* live mode (TDD style): `yarn test-watch`

### 2. Smoke & Functional Tests

See docs [here](https://github.com/hmcts/ccd-case-management-web/blob/master/test/README.md) 

              
## Production

To build your application, run:

* `yarn build`

You can now go to `/dist` and deploy that to your server!

## Documentation.

You can generate api docs (using [TypeDoc](http://typedoc.org/)) for your code with the following:

* `yarn docs`

## LICENSE

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
