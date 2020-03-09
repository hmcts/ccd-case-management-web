#!/bin/bash

 [[ -z $CCD_CASEWORKER_AUTOTEST_FE_EMAIL ]] && echo "CCD_CASEWORKER_AUTOTEST_FE_EMAIL is not set" || echo "CCD_CASEWORKER_AUTOTEST_FE_EMAIL=$CCD_CASEWORKER_AUTOTEST_FE_EMAIL";
 [[ -z $CCD_CASEWORKER_AUTOTEST_FE_PASSWORD ]] && echo "CCD_CASEWORKER_AUTOTEST_FE_PASSWORD is not set";
 [[ -z $TEST_URL ]] && echo "TEST_URL is not set" || echo "TEST_URL=$TEST_URL";

export PROTRACTOR_OUTPUT_DIR=smoke-output

if [[ ${TEST_URL} != *"preview-staging"* ]];then
        yarn run test:smokeTest
else
        echo "THIS IS A PREVIEW ENV, NOT RUNNING SMOKE TESTS DUE TO GREY SCREEN ISSUE ON PREVIEW"
fi


