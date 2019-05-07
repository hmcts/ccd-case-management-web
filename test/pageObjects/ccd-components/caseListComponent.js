/**
 * Class to encapsulate functionality around the case list table on the landing page
 * and the case list seatch result table
 */
class CaseListComponent extends BasePage {

  constructor(){
    super();

    this.parentCss = '#search-result table'
    this._columnNamesList = '#search-result table thead table tr > div:nth-of-type(1)';

    this._columnDataCssTemplate = '#search-result table tbody tr td:nth-of-type(X)'
    this._resultCount = by.css('.pagination-top');
    this._sortIcon = by.css('.search-result-column-sort .sort-widget');
    this._firstLink = by.css('#search-result table tbody tr:nth-of-type(1) td:nth-of-type(1) a');
    this._pageTwoLink = by.css('.ngx-pagination li.current+li a');
    this._selectedPaginationControlNumber = 'pagination-template li.current span:nth-of-type(2)';
  }

  /**
   * Check case list table is displayed
   * @returns {Promise<*|boolean>}
   */
  async isDisplayed(){
      return await $(this.parentCss).isDisplayed()
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
  async clickSortIcon() {
    await element(this._sortIcon).click();
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
  async clickFirstColumnResultText() {
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
