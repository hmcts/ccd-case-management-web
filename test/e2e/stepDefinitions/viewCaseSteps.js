"use strict";
var viewcase = require("../pages/viewCasePage");
var pageActions = require("../pages/pageActions");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given, When, Then }) {

  Then('I should be navigated to case view page', function (next) {
    expect(pageActions.returnHeading()).to.eventually.contains("#1").and.notify(next);
  });

  Given('I am viewing a case', function (next) {
    browser.get(viewcase.address).then(function (){
      next();
    }) ;
  });

  Then('I should see relevant tabs for the case', function (next) {
    element.all(by.css("[role=tab]")).count().then(function(count) {
      expect(count).to.equal(11);
      next();
    });
  });

  Then('the tabs should have relevant data', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

  Then('relevant events should be displayed', function (callback) {
    // Write code here that turns the phrase above into concrete actions
    callback(null, 'pending');
  });

});
