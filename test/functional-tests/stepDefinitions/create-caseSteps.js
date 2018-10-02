
let Login = require('../pageObjects/loginPage.js');
let CaseListPage = require('../pageObjects/caseListPage.js');
let CreateCaseStartPage = require('../pageObjects/createCaseStartPage');
let NavBar = require('../pageObjects/ccd-components/globalNavBar.js');


let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  async function navigateToCreateCasePage(){
      createCaseStartPage = await caseListPage.getNavBarComponent().clickCreateCaseLink();
      await createCaseStartPage.selectJurisdiction('Test');
      await createCaseStartPage.selectCaseType('Demo case');
      await createCaseStartPage.selectEvent('Create a new case');
      await createCaseStartPage.clickStartButton();
  }

  When(/^I create a new case$/, async function () {
    await navigateToCreateCasePage()
  });

  When(/^I navigate to the case creation form page$/, async function () {
    await navigateToCreateCasePage()
  });

  Then(/^I print console output of the fields on the page$/, async function () {
    browser.sleep(5000)
    console.log('should be on the wizard page now')
  });

  Then(/^I should see the following case types displayed:$/, async function(table) {

    let arrayOfCells = await table.raw();
    for (let i=0; i < arrayOfCells.length; i++) {
      console.log(arrayOfCells[i][0])
    }

  });

  Given(/^a case type containing every field type exists$/, function() {
  });



});

