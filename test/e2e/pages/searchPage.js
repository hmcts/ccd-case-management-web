"use strict";
function searchPage() {
  this.address = "http://localhost:3451/search";
  this.heading = element(by.css('.heading-xlarge'));
  this.searchLink = element(by.css('[href="/search"]'));
  this.jurisdiction = element(by.css('[name="jurisdiction"]'));
  this.caseType = element(by.css('[name="case-type"]'));


  this.selectOption = function(value) {
    return element(by.cssContainingText('option', value));
  };




}
module.exports = new searchPage();
