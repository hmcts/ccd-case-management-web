
BasePage = require('../basePage.js')

class WorkbasketComponent extends BasePage {

    constructor() {
      super();

      //Fixed Elements (non dynamic)
      this._clfJurisdiction = '#wb-jurisdiction';
      this._clfCaseType = '#wb-case-type';
      this._clfState = '#wb-case-state';
      this._clfApplyButton = '.global-display .display-left button';

    }

}

module.exports = WorkbasketComponent;
