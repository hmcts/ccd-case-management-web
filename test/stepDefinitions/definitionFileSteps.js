
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
    Data.jurisdiction = 'Auto Test 1';
    Data.caseType = 'All Field Data Types';
  });

  Given(/^a case with Case Progression functionality exists$/, function() {
    Data.caseType = 'Case Progression';
  });

  Given(/^a case containing Tabs functionality exists$/, function() {
    Data.caseType = 'Tabs functionality';
    Data.mandatoryFields = [{fieldType: 'text', fieldId: 'TextField1'},
                            {fieldType: 'text', fieldId: 'TextField2'},
                            {fieldType: 'text', fieldId: 'TextField3'},
                            {fieldType: 'text', fieldId: 'TextField4'},
                            {fieldType: 'text', fieldId: 'TextField5'},
                            {fieldType: 'text', fieldId: 'TextField6'},
                            {fieldType: 'text', fieldId: 'TextField7'},
                            {fieldType: 'text', fieldId: 'ConditionalText', value: 'showmethemoney'},
                            {fieldType: 'fixed-list', fieldId: 'ConditionalFixedList', value: 'TRUE'},
                            {fieldType: 'yes-no', fieldId: 'ConditionalYesNo', value: 'Yes'}
                          ];
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

  Given(/^a case type exists with case reference configured in the case list results$/, async function () {
    Data.caseType = 'All Field Data Types';
  });

});
