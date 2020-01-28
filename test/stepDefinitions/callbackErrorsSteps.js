let CallbackErrorsComponent = require('../pageObjects/ccd-components/callbackErrorsComponent.js');

let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { Given, When, Then, Before, After } = require("cucumber");

let callbackErrorsComponent = new CallbackErrorsComponent();

Then(/^the following callback errors are shown:$/, async function (dataTable) {
  expect(await callbackErrorsComponent.isDisplayed()).to.be.true;
  expect(await callbackErrorsComponent.isDisplayingErrors()).to.be.true;
  let expectedErrors = await [].concat(...dataTable.raw());
  let actualErrors = await callbackErrorsComponent.getErrors();
  expect(expectedErrors).to.deep.equal(actualErrors);
});

Then(/^the following callback warnings are shown:$/, async function (dataTable) {
  expect(await callbackErrorsComponent.isDisplayed()).to.be.true;
  expect(await callbackErrorsComponent.isDisplayingWarnings()).to.be.true;
  let expectedWarnings = await [].concat(...dataTable.raw());
  let actualWarnings = await callbackErrorsComponent.getWarnings();
  expect(expectedWarnings).to.deep.equal(actualWarnings);
});

Then(/^no callback errors or warnings are shown$/, async function () {
  expect(await callbackErrorsComponent.isDisplayed()).to.be.false;
});
