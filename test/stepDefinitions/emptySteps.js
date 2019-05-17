
var { defineSupportCode } = require("cucumber");

/**
 * This class is to put steps that require no implementation but are there purely for readability on the BDD side
 */
defineSupportCode(function ({ Given, When, Then}) {

  Given(/^this event contains a read only value of the fixed list from the previous event$/, function() {
    //The (Approve case) event has been configured in the definition file to have a read only field containing the value
    // of a fixed list from the previous event
  });


});
