class CcdMultiSelectField {

  constructor(css) {
    this.css = css;
    this.optionsDiv = $$(`${this.css} .multiple-choice input`);
    this.labels = this._getLabels();
    this.selectedCheckboxes = `${this.css} input[type="checkbox"]:checked + label`
  }

  /**
   * Returns an options array
   * @returns array of options
   */
  async getOptions() {
    let optionValues = [];
    for(const field of await this.optionsDiv){
      let value = await field.getAttribute('value');
      optionValues.push(value);
    }
    return optionValues;
  }

  /**
   * Will randomly select any multi select option or a specified option value
   */
  async selectAnyOneElement(optionValue) {

    if (typeof optionValue === 'undefined') {
      let multiSelectElements = await this._getMultiSelectElements();
      let elementListSize = await multiSelectElements.length;
      let randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await elementListSize);
      let optionToSelect = await multiSelectElements[randomOptionArrayInt - 1];
      await optionToSelect.click();
    } else {
      let optionToSelect = await this._getMultiSelectOption(optionValue);
      await optionToSelect.click();
    }
  }


  /**
   * return array of names of all selected checkboxes
   * @returns {Promise<Array>}
   */
  async getSelectedCheckboxes(){
    let checkboxNames = [];
    for (const checkbox of await $$(this.selectedCheckboxes)) {
      checkboxNames.push(await checkbox.getText())
    }
    return checkboxNames;
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldReady() {
    let multiSelectElements = await this._getMultiSelectElements();
    for (const elem of multiSelectElements) {
      let isPresent = await elem.isPresent();
      let isEnabled = await elem.isEnabled();
      if (!isPresent || !isEnabled) {
        return false;
      }
    }
    return true;
  }

  /**
   * Check if field is present
   * @returns true or false
   */
  async hasFieldLabels(labelArray) {
    let labels = await this._getLabels();

    if (labelArray.length !== labels.length) {
      return false;
    }
    for (var i = labelArray.length; i--;) {
      if (!labels.includes(labelArray[i]))
        return false;
    }
    return true;
  }

  async _getLabels() {
    let labelsTexts = [];
    let labels = $$(`${this.css} .form-label`);

    return await labels.each(function (label) {
      return label.getText().then(function (text) {
        labelsTexts.push(text);
      });

    }).then(function () {
      return labelsTexts;
    });
  }

  //private
  async _getMultiSelectElements(){
    return await $$(`${this.css} input`);
  }

  async _getMultiSelectOption(optionValue) {
    let multiSelectElements = await this._getMultiSelectElements();
    for (const elem of multiSelectElements) {
      const elemText = await elem.getAttribute("value");
      if (elemText === optionValue) {
        return elem;
      }
    }
  }

  /**
   * Get list of string multi select options
   * @returns String Array
   */
  async _getMultiSelectTextValues() {
    let multiSelectElements = await this._getMultiSelectElements();
    let stringArray = [];
    for (const elem of multiSelectElements) {
      const elemText = await elem.getAttribute("value");
      stringArray.push(elemText);
    }
    return stringArray;
  }

}

module.exports = CcdMultiSelectField;
