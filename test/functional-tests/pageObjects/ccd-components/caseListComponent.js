/**
 * Class to encapsulate functionality around the case list table on the landing page
 * and the case list seatch result table
 */
class CaseListComponent extends BasePage {

  constructor(){
    super();

    this.parentCss = '#search-result table'
  }

  /**
   * Check case list table is displayed
   * @returns {Promise<*|boolean>}
   */
  async isDisplayed(){
      return await $(this.parentCss).isDisplayed()
  }


}

module.exports = CaseListComponent;
