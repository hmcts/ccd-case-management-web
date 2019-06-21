class CCDAddressUKField {

  constructor(css, id) {

    this.css = css;
    let selectorPrefix =  typeof id === 'undefined' ? `${css}` : `${css} div[id="${id}"]`;

    this.button = new Button(selectorPrefix + ' .manual-link', 't enter a UK postcode');
    // this.addressLine1 = new TextField(selectorPrefix + ` input[id*='AddressLine1']`);


    this.postcodeText = new TextField('.postcodeinput');
    this.findAdressButton = new Button('.button', 'Find address');
    this.addressListDropDown = new DropDown('ccd-write-address-field select');
    this.addressLine1 = new TextField('#AddressUKField__AddressLine1');
    this.addressLine2 = new TextField('#AddressUKField__AddressLine2');
    this.postTown = new TextField('#AddressUKField__PostTown');
  }

  async isAlertDisplayed() {
    const EC = protractor.ExpectedConditions;
    let DEFAULT_TIMEOUT = 10000;

    try {
      debugger;
      await browser.waitForAngular;
      console.log(browser.getSession());
      let element = element(by.xpath(`//ccd-alert/cut-alert//div[contains(text(), 'postcode')]`));
      await browser.wait(EC.visibilityOf(element1), DEFAULT_TIMEOUT)  ;
      await browser.waitForAngular;
      return true;
    } catch (e) {
      let message = `timed out after ${DEFAULT_TIMEOUT} waiting for radio element ${element} to be visible`;
      throw new CustomError(message, e);
    }
  }

  async enterTextIntoAddressLine1(value) {
    value = typeof value === 'undefined' ? await RandomUtils.generateRandomString() : value;

    await this.button.click();
    await this.addressLine1.enterText(value);
  }
}

module.exports = CCDAddressUKField;
