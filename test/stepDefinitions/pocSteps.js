POCPAge = require('../pageObjects/poc/poc.js');


let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;

var { defineSupportCode } = require("cucumber");

defineSupportCode(function ({ Given, When, Then, Before, After }) {


  /**
   * NOTE the 'page' would have to be non static, might need a switch statement depending on
   * what page you are on so you can call individual page object methods
   */
  Given('the page contains the following fields', async function (dataTable) {


    /**
     * Here we take the data from the data table in BDD
     * @type {Array}
     */
    let table = await dataTable.rows();


    /**
     * We build this data from BDD into an object to match the format of the object
     * returned from the page so we can then compare objects directly
     * NOTE: we may need to flatten nested arrays (ef collections, complextypes)
     * from the Object returned from Page Object as we cannot represent nested
     * objects in the BDD data table
     */
    let expectedFields = [];
    for (const row of table){
      let id = row[0];
      let value = row[1];
      let hidden = row[2];
      expectedFields.push([id,value,hidden]);
    }
    console.log('Data from data table')
    console.log(expectedFields);



    /**
     * All data for page is encapsulated in that page so we call the page object
     * to get field data and attributes. Each page should have a method (when needed)
     * to return this data, an interface might be useful here(in page object)?
     */
    let page = new POCPAge();
    let actualPageData = await page.returnPageFields();

    console.log('Data from page - NOT YET IMPLEMENTED IN TEST')
    console.log(actualPageData);


    /**
     * we should theoretically have 2 objects which are an array of arrays, each item
     * in array is a field containing an array of it's individual attributes
     */
    expect(expectedFields).to.deep.eq(actualPageData)
  });





});
