#!/bin/bash
set -ex

docker-compose -f docker-compose.tests.yml run --rm -u `id -u $USER` protractor test:smokeTests
