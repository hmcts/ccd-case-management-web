#!/bin/bash

##set -ex
##docker-compose -f docker-compose.tests.yml run --name "ccd-case-management-protractor" --rm -u `id -u $USER` protractor test:smokeTests
 
 if [ -z "$CCD_CASEWORKER_AUTOTEST_EMAIL" ] ; 
then echo "CCD_CASEWORKER_AUTOTEST_EMAIL null"; 
fi;

 if [ -z "$CCD_CASEWORKER_AUTOTEST_PASSWORD" ]; 
then echo "CCD_CASEWORKER_AUTOTEST_PASSWORD null"; 
fi;

 if [ -z "$TEST_URL" ]; 
then echo "TEST_URL null"; 
else echo "TEST_URL $TEST_URL";
fi;

 yarn run test:smokeTest
