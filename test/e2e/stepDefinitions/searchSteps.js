"use strict";
var search = require("../pages/searchPage");
var pageActions = require("../pages/pageActions");
var { defineSupportCode } = require("cucumber");

defineSupportCode(function({ Given, When, Then }) {

  Given('I am on Search Page', function (next) {
    browser.get(search.address).then(function (){
      next();
    }) ;

    expect(pageActions.returnHeading()).to.eventually.contains("Search").and.notify(next);
  });

  When('I select Jurisdiction value', function (next) {
    search.selectOption("Probate").click().then(function (){
      next();
    }) ;
  });

    When('I select Case Type value', function (next) {
      search.selectOption("Complex Address Book Case").click().then(function (){
        next();
      }) ;
    });

    Then('I should see Search Input fields displayed', function (callback) {
      // Write code here that turns the phrase above into concrete actions
      callback(null, 'pending');
    });


});
