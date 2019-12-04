let CustomError = require('../utils/errors/custom-error.js');
let Login = require('../pageObjects/loginPage.js');
let CaseListPage = require('../pageObjects/caseListPage.js');


let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then}) {

  let caseListPage = new CaseListPage();
  let loginPage;

  Given(/^I am on the CCD login page$/, async function () {
      loginPage = await Login.open();
  });

  When(/^I login with correct credentials$/, async function () {
      let username = process.env.CCD_CASEWORKER_AUTOTEST_FE_EMAIL;
      let password = process.env.CCD_CASEWORKER_AUTOTEST_FE_PASSWORD;

      await loginPage.inputCredentials(username, password);
      await loginPage.clickSignIn();
  });


  Then(/^I should see CCD case list page$/, async function () {
      caseListPage = new CaseListPage();
      await caseListPage.waitForPageLoaded();

      expect (await caseListPage.isFiltersDisplayed()).to.be.true;
      expect (await caseListPage.getNavBarComponent().allComponentsDisplayed()).to.be.true;
      expect (await caseListPage.getFooter().isDisplayed()).to.be.true;
  });


  Then(/^I should see the '(.*)' on the CCD case list page$/, async function (component) {
    caseListPage = new CaseListPage();

    await caseListPage.waitForPageLoaded();

    switch (component){
      case 'filters':
        //we are waiting for the page to load by waiting for the filters so this is already done
        break;
      case 'banners':
        expect (await caseListPage.getNavBarComponent().allComponentsDisplayed()).to.be.true;
        expect (await caseListPage.getFooter().isDisplayed()).to.be.true;
        break;
      case 'case list results':
        expect (await caseListPage.getCaseListComponent().isDisplayed()).to.be.true;
        break;
      default: throw new CustomError('Invalid option in switch statement')
    }

  });

  Given(/^I have logged in$/, {timeout: 120 * 1000}, async function () {
    loginPage = await Login.open();
    await loginPage.loginToApp();

    caseListPage = new CaseListPage();
    await caseListPage.waitForPageLoaded();
  });

  Given(/^I have logged in as '(.*)'$/, {timeout: 120 * 1000}, async function (username) {
    browser.ignoreSynchronization = true;
    loginPage = await Login.open();
    await loginPage.loginToApp(username);
    browser.ignoreSynchronization = false;

    caseListPage = new CaseListPage();
    await caseListPage.waitForPageLoaded();
  });

  Then(/^I should see the <component> on the CCD case list page$/, async function () {
      await waitForLandingPageToLoad();
      caseListPage = new CaseListPage();

      expect (await caseListPage.isFiltersDisplayed()).to.be.true
  });


  Then(/^I have a failed test$/, async function () {
    loginPage = await Login.open();

    let username = process.env.CCD_CASEWORKER_AUTOTEST_FE_EMAIL;

    await loginPage.inputCredentials(username, 'WRONGPASSWORD');
    await loginPage.clickSignIn();

    caseListPage = new CaseListPage();
    await caseListPage.waitForPageLoaded();
  });



});
