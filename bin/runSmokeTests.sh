#!/bin/bash
set -ex

docker ps -a

docker-compose -f docker-compose.tests.yml down protractor

docker-compose -f docker-compose.tests.yml run --name "ccd-case-management-protractor" --rm -u `id -u $USER` protractor test:smokeTests
