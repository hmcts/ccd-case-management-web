let AddressComplex = require('../../ccd-components/fields/ccdAddressUKFieldHidden.js');

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
