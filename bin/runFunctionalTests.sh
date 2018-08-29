#!/bin/bash
set -ex

docker-compose -f docker-compose.tests.yml run --name "ccd-case-management-protractor" --rm -u `id -u $USER` protractor test:functionalTests
