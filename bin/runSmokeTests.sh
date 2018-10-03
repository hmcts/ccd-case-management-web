#!/bin/bash

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
