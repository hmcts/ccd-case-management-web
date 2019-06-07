class CCDAddressUKField {

  constructor(css, id) {
    this.css = css;
    let selectorPrefix =  typeof id === 'undefined' ? `${css}` : `${css} div[id="${id}"]`;
    this.button = new Button(selectorPrefix + ' .manual-link', 't enter a UK postcode');

    this.addressLine1 = new TextField(selectorPrefix + ` input[id*='AddressLine1']`);
    // this.addressLine2 = "";
    // this.addressLine3 = "";
    // this.postTown = "";
    // this.county = "";
    // this.postcode = "";
    // this.country = "";
  }

  async enterTextIntoAddressLine1(value) {
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomString() : value;

    await this.button.click();
    await this.addressLine1.enterText(value);
  }
}

module.exports = CCDAddressUKField;
