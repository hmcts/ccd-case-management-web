
BasePage = require('../basePage.js')

class WorkbasketComponent extends BasePage {

    constructor() {
      super();

      //Fixed Elements (non dynamic)
      this._clfJurisdiction = by.css('#wb-jurisdiction');
      this._clfCaseType = by.css('#wb-case-type');
      this._clfState = by.css('#wb-case-state');
      this._clfApplyButton = by.css('.global-display .display-left button');

    }

    async selectJurisdiction(jurisdiction){
        await this.selectOption(this._clfJurisdiction, jurisdiction)
    }

}

module.exports = LoginPage;
