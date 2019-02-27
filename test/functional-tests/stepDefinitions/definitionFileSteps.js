
let Login = require('../pageObjects/loginPage.js');
let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage');
let NavBar = require('../pageObjects/ccd-components/globalNavBar.js');
let Data = require('../utils/TestData.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  Given(/^I have a case with 3 pages$/, async function () {
    Data.caseType = 'Multiple Pages';
  });

  Given(/^a case type containing every field type exists$/, function() {
    Data.caseType = 'All Data Types';
  });

  Given(/^a case with Case Progression functionality exists$/, function() {
    Data.caseType = 'Case Progression';
  });

  Given(/^a case with a Mandatory field exists$/, function() {
    Data.caseType = 'Case Progression';
  });

  Given(/^a case type containing a regex validated field exists$/, function() {
    Data.caseType = 'Regex';
  });

  Given(/^a case type containing conditionals exists$/, function() {
    Data.caseType = 'Conditionals';
  });

  Given(/^I have filled out the create case filters$/, function () {
    Data.jurisdiction = 'Divorce';
    Data.caseType = 'Divorce';
    Data.event = 'Create case';
  });


});
