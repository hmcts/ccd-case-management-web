#!/bin/bash
set -ex

docker ps

docker stop $(docker ps -f name=ccd-case-management-protractor --quiet)

docker-compose -f docker-compose.tests.yml run --name "ccd-case-management-protractor" --rm -u `id -u $USER` protractor test:smokeTests
