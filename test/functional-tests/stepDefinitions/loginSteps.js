
let Login = require('../pageObjects/loginPage.js')
let CaseListPage = require('../pageObjects/caseListPage.js')
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {

  Given(/^I am on the CCD login page$/, async function () {
      loginPage = await Login.open();
  });

  When(/^I login with correct credentials$/, async function () {
      let username = process.env.CCD_CASEWORKER_AUTOTEST_EMAIL;
      let password = process.env.CCD_CASEWORKER_AUTOTEST_PASSWORD;

      await loginPage.inputCredentials(username, password);
      await loginPage.clickSignIn();
  });


  Then(/^I should see CCD case list page$/, async function () {
      caseListPage = new CaseListPage();
      failedOnPageTitle = 'page not titled on case list page';

      expect (await caseListPage.isFiltersDisplayed()).to.be.true
  });

});
