let AddressComplex = require('../../ccd-components/complexTypes/addressHiddenComplex.js');

class ConditionalsCreateCasePage3WizardPage extends CreateCaseWizardPage {

  constructor() {
    super();
    this.addressComplex = new AddressComplex();
  }

  async getAddressComplex(){
    return this.addressComplex;
  }

}

module.exports = ConditionalsCreateCasePage3WizardPage;
