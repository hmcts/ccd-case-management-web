class CcdMultiSelectField {

  constructor(css){
      this.css = css;
      this.labels = this._getLabels();
  }

  /**
   * Will randomly select any multi select option
   */
  async selectAnyOneElement(){
    let options = await this._getMultiSelectTextValues();
    let elementListSize = await options.length;
    let randomOptionArrayInt = await RandomUtils.generateRandomInt(1, await elementListSize);
    let optionToSelect = await options[randomOptionArrayInt-1];
    await optionToSelect.click();
  }

  /**
   * Check if field is ready to type
   * @returns true or false
   */
  async isFieldInputReady(){
    let multiSelectElements = await this._getMultiSelectElements();
    for (const elem of multiSelectElements){
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
  async hasFieldLabels(labelArray){
    let labels = await this._getLabels();

    if (labelArray.length !== labels.length) {
      return false;
    }
    for(var i = labelArray.length; i--;) {
        if(!labels.includes(labelArray[i]))
            return false;
    }
    return true;
  }

  async _getLabels(){
    let labelsTexts = [];
    let labels = $$(`${this.css} .form-label`);

    return await labels.each(function(label){
        return label.getText().then(function(text){
          labelsTexts.push(text);
        });

    }).then(function(){
        return labelsTexts;
    });
  }

    //private
    async _getMultiSelectElements(){
      return await $$(`${this.css} input`);
    }
  
    /**
     * Get list of string multi select options
     * @returns String Array
     */
    async _getMultiSelectTextValues(){
      let multiSelectElements = await this._getMultiSelectElements();
      let stringArray = [];
      for (const elem of multiSelectElements){
        const elemText = await elem.getText();
        stringArray.push(elemText);
      }
      return stringArray;
    }

}

module.exports = CcdMultiSelectField;
