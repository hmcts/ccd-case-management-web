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

}

module.exports = CaseListComponent;
