#!/bin/bash

 [[ -z $CCD_CASEWORKER_AUTOTEST_FE_EMAIL ]] && echo "CCD_CASEWORKER_AUTOTEST_FE_EMAIL is not set";
 [[ -z $CCD_CASEWORKER_AUTOTEST_FE_PASSWORD ]] && echo "CCD_CASEWORKER_AUTOTEST_FE_PASSWORD is not set";
 [[ -z $TEST_URL ]] && echo "TEST_URL is not set" || echo "TEST_URL=$TEST_URL";


 yarn run test:functionalTests
