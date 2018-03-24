"use strict";
var pageActions = require("../pages/pageActions");
var login = require("../pages/loginPage");
var { defineSupportCode } = require("cucumber");
var jwtGenerate = require('../support/jwtTokenGenerator');
var token = new jwtGenerate();

defineSupportCode(function ({ Given, When, Then }) {

    // Given('I am on Definition Import IDAM login page', function (next) {
    //     expect(pageActions.returnTitle()).to.eventually.equals("Sign in").and.notify(next);
    //  });

    // When('I enter username as {username}', function (username) {
    //   browser.ignoreSynchronization = true;
    //   browser.driver.wait(browser.driver.findElement(By.xpath("//*[@id='username']")).sendKeys(username));
    //   // login.username.sendKeys(username).then(function () {
    //  //  next();
    //  // });
    //
    // });

  Given('I login to case definition import page with username as "{username}" and password as "{password}"', function (username,password,next) {

    token.generateJwtToken(username, password)
      .then(function (jwtToken) {
        browser.driver.get(login.address + '/import?jwt=' + jwtToken);
        browser.ignoreSynchronization = true;
        browser.waitForAngular();
      });
    next();

  });

    // When('I click on signin', function (next) {
    //   pageActions.submitButton.click().then(function () {
    //         next();
    //     });
    // });

    Then('the error message should contain the phrase {stringInDoubleQuotes}', function (stringInDoubleQuotes, next) {
        expect(importer.errorMessageReturn()).to.eventually.contain(stringInDoubleQuotes).and.notify(next);
    });


});
