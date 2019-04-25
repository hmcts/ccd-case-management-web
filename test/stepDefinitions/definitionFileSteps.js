let Data = require('../utils/TestData.js');

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  Given(/^I have a case with 3 pages$/, async function () {
    Data.caseType = 'Multiple Pages';
    Data.optionalFields = [{fieldType: 'text', fieldId: 'TextFieldFName'}];
  });

  Given(/^a case type containing every field type exists$/, function() {
    Data.jurisdiction = 'Auto Test 1';
    Data.caseType = 'All Field Data Types';
    Data.optionalFields = [{fieldType: 'text', fieldId: 'TextField'}];
  });

  Given(/^a case with Case Progression functionality exists$/, function() {
    Data.caseType = 'Case Progression';
    Data.mandatoryFields = [{fieldType: 'text', fieldId: 'TextField0'},
                            {fieldType: 'text', fieldId: 'TextField1'},
                            {fieldType: 'text', fieldId: 'TextField2'}];
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

  Given(/^a case with multiple events exists$/, function() {
    Data.caseType = 'Case Progression';
  });

  Given(/^a case with a Mandatory field exists$/, function() {
    Data.caseType = 'Case Progression';
    Data.mandatoryFields = [{fieldType: 'text', fieldId: 'TextField0'},
                            {fieldType: 'text', fieldId: 'TextField1'},
                            {fieldType: 'text', fieldId: 'TextField2'}];
  });

  Given(/^a case type containing a regex validated field exists$/, function() {
    Data.caseType = 'Regex';
    Data.mandatoryFields = [{fieldType: 'text', fieldId: 'TextField'}];
  });

  Given(/^a case type containing conditionals exists$/, function() {
    Data.caseType = 'Conditionals';
    Data.optionalFields = [{fieldType: 'text', fieldId: 'TextField'}];
  });

  Given(/^a case type exists with case reference configured in the case list results$/, async function () {
    Data.caseType = 'All Field Data Types';
    Data.optionalFields = [{fieldType: 'text', fieldId: 'TextField'}];
  });

  Given(/^a case with a single event exists$/, async function () {
    Data.caseType = 'All Field Data Types';
  });

  Given(/^a case type containing Complex and Collection types exists$/, function() {
    Data.caseType = 'Complex in Coll in Complex';
    Data.event = 'Create school';
  });
});
