class CyaPage extends BasePage {

  constructor() {
    super();
    this.fieldLabels = 'form th span';
    this.complexFieldLabels = 'form span';
  }

  async getFieldLabels() {
    return await this.getElementsByCss(this.fieldLabels);
  }

  async getComplexFieldLabels() {
    return await this.getElementsByCss(this.complexFieldLabels);
  }

  async getElementsByCss(cssSelector) {
    let labelElements = await $$(cssSelector);
    let labels = [];
    for (const labelElem of labelElements) {
      let label = await labelElem.getText();
      labels.push(label)
    }
    return labels;
  }
}

module.exports = CyaPage;
