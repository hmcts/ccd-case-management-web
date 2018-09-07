#!/bin/bash

## Move to the Protractor test project folder
cd $HOME

if [ -z "$CCD_CASEWORKER_AUTOTEST_EMAIL" ] ; then echo "CCD_CASEWORKER_AUTOTEST_EMAIL null"; fi;
if [ -z "$CCD_CASEWORKER_AUTOTEST_PASSWORD" ]; then echo "CCD_CASEWORKER_AUTOTEST_PASSWORD null"; fi;
if [ -z "$TEST_URL" ]; then echo "TEST_URL null"; fi;

## Check proxy accessible

ping -c 2 proxyout.reform.hmcts.net

# ls -l

yarn install

ls -l

node -v

Xvfb :99 -screen 0 1920x1080x24 2>&1 >/dev/null &

echo "Running Protractor tests"

## The 'uluwatu-e2e-protractor' test project launch configuration file (e2e.conf.js) should be passed here.

 DISPLAY=:99 yarn $@
 export RESULT=$?

 echo "Protractor tests have done"

## Close the XVFB display

 killall Xvfb

 exit $RESULT
