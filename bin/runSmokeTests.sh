docker build -t ccd-protractor:latest test/. 
&& docker run -t --rm -e CCD_CASEWORKER_AUTOTEST_EMAIL=$CCD_CASEWORKER_AUTOTEST_EMAIL -e CCD_CASEWORKER_AUTOTEST_PASSWORD=$CCD_CASEWORKER_AUTOTEST_PASSWORD -e TEST_FRONTEND_URL=$TEST_FRONTEND_URL --name protractor-runner ccd-protractor:latest test:smokeDocker
