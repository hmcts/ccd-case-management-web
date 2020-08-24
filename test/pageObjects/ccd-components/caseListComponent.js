let CustomError = require('../../utils/errors/custom-error');


/**
 * Class to encapsulate functionality around the case list table on the landing page
 * and the case list seatch result table
 */
class CaseListComponent extends BasePage {

  constructor(){
    super();

    this.parentCss = '#search-result table';
    this.noCasesFound = '#search-result div';
    this._columnNamesList = '#search-result table thead table tr > div:nth-of-type(1)';

    this._columnDataCssTemplate = '#search-result table tbody tr td:nth-of-type(X)'
    this._resultCount = by.css('.pagination-top');
    this._sortIcon = by.css('.search-result-column-sort .sort-widget');
    this._firstLink = by.css('#search-result table tbody tr:nth-of-type(1) td:nth-of-type(1) a');
    this._pageTwoLink = by.css('.ngx-pagination li.current+li a');
    this._selectedPaginationControlNumber = 'pagination-template li.current span:nth-of-type(2)';
    this._paginationItems = 'pagination-template > ul > li';
    this._paginationPageNumberLinks = 'pagination-template > ul > li > a >span:nth-of-type(2)';
    this._paginationNext = 'pagination-template .pagination-next > a';
    this._paginationPrevious = 'pagination-template .pagination-previous > a';


  }

  /**
   * Check case list table is displayed
   * @returns {Promise<*|boolean>}
   */
  async isDisplayed(){
      return await $(this.parentCss).isDisplayed() || await $(this.noCasesFound).isDisplayed()
  }

  /**
   * Gets a column by columns name and returns all results for that column in case list table
   * @param expectedColumnTitle
   * @returns {Promise<*>} Array of WebElements
   */
  async getColumnResults (expectedColumnTitle){
      let columnNamesElements =  $$(this._columnNamesList);
      let titleArraySize = await columnNamesElements.count();

      for (let i = 0; i < titleArraySize; i++) {
        let title = await columnNamesElements.get(i).getText();
        if (await title === expectedColumnTitle){
            this.columnIndex = i + 1;
            break;
        }
      }

      if (typeof this.columnIndex === 'undefined'){
        throw new CustomError(`Could not find column with name '${expectedColumnTitle}'`)
      }

      let columnDataCss = this._columnDataCssTemplate.replace('X',this.columnIndex);
      return await $$(columnDataCss)
  }

  /**
   * Gets a column by columns name and returns all results for that column in case list table
   * @param expectedColumnTitle
   * @returns {Promise<*>} Array of Text
   */
  async getColumnResultsValues (expectedColumnTitle){
    let results = []
    for (const result of await this.getColumnResults(expectedColumnTitle)){
      results.push(await result.getText())
    }
    return results
  }

  /**
   * Returns all results for first column in case list table
   * @returns {Promise<*>} Array of WebElements
   */
  async getFirstColumnResults (){
      let columnDataCss = this._columnDataCssTemplate.replace('X', 1);
      return await $$(columnDataCss)
  }

  /**
   * Click Sort icon to sort results
   * @returns {Promise<void|*>}
   */
  async clickSortIconAscending() {
    await element(this._sortIcon).click();

    if (await this._getSortOrderIcon() !== 'ascending'){
      await element(this._sortIcon).click();
    }
  }

  /**
   * Click Sort icon to sort results
   * @returns {Promise<void|*>}
   */
  async clickSortIconDescending() {
    await element(this._sortIcon).click();

    if (await this._getSortOrderIcon() !== 'descending'){
      await element(this._sortIcon).click();
    }
  }

  async _getSortOrderIcon(){
    let asc = '▼';
    let desc = '▲';
    let sortIcon = await element(this._sortIcon).getText();
    if (await sortIcon === asc){
      return 'ascending'
    } else if (sortIcon === desc) {
      return 'descending'
    } else {
      throw new CustomError(`Could not detect sort icon sort direction`)
    }
  }

  /**
   * Click Sort icon to sort results
   * @returns {Promise<void|*>}
   */
  async clickFirstColumnResultLink() {
    await element(this._firstLink).click();
  }

  /**
   * Click link "2" on pagination area
   * @returns {Promise<void|*>}
   */
  async clickPageTwo() {
    await element(this._pageTwoLink).click();
  }

  /**
   * get text in first line
   * @returns {Promise<string|*>}
   */
  async getFirstColumnResultText() {
    return await element(this._firstLink).getText();
  }

  /**
   * Return the result of total cases found above the case list table
   * eg 'Displaying 1 - 25 out of 284 results'
   * @returns {Promise<String|*>}
   */
  async getResultCountText(){
    return await element(this._resultCount).getText();
  }


  async getTotalCases(){
    let resultText = await this.getResultCountText();
    let regex = /(?<=of )\d+(?= results)/;
    let totalCases = await resultText.match(regex)
    return totalCases
  }

  /**
   * Click a pagination item, can be a page number or the 'next' / 'previous' button
   * @param linkToClick
   * @returns {Promise<void>}
   */
  async clickPaginationLink(linkToClick){
    if (linkToClick.toLowerCase() === 'next'){
       await $(this._paginationNext).click();
    } else if (linkToClick.toLowerCase() === 'previous'){
       await $(this._paginationPrevious).click();
    } else {
      let linkFound = false;
      for (const link of await $$(this._paginationPageNumberLinks)){
        let linkText = await link.getText();
        if (await linkText === linkToClick){
          await link.click();
          linkFound = true;
          break;
        }
      }

      if (!linkFound){
        throw new CustomError(`Could not find pagination link to click: '${linkToClick}'`)
      }
    }

  }

  /**
   * Get String Array of pagination items
   * @returns {Promise<Array>}
   */
  async getPaginationItems(){
    let items = []
    for (const link of await $$(this._paginationPageNumberLinks)) {
        items.push(await link.getText())
    }
    return items;
  }

  /**
   * Click the last available page via the pagination display
   * @returns {Promise<void>}
   */
  async clickLastPaginationPage(){
    let paginationItems = await $$(this._paginationItems).count();
    let itemToClick = await $$(this._paginationItems).get(paginationItems - 2)
    await itemToClick.click()
  }


  /**
   * Returns boolean of the previous pagination link being displayed
   * @returns {Promise<Boolean>}
   */
  async isPaginationPreviousLinkDisplayed(){
    if (await $(this._paginationPrevious).isPresent()) {
      return await $(this._paginationPrevious).isDisplayed()
    } else {
      return false
    }
  }

  /**
   * Returns boolean of the next pagination link being displayed
   * @returns {Promise<Boolean>}
   */
  async isPaginationNextLinkDisplayed(){
    if (await $(this._paginationNext).isPresent()) {
      return await $(this._paginationNext).isDisplayed()
    } else {
      return false
    }
  }

  /**
   * Return the currently selected number selected on the Pagination control bar
   * the bar is eg '<< Previous 1 2 3 ... n Next >>'
   * @returns {Promise<void>}
   */
  async getSelectedPaginationControlNumber(){
    return await $(this._selectedPaginationControlNumber).getText();
  }

}

module.exports = CaseListComponent;
