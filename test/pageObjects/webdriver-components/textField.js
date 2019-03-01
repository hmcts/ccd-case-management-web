/**
 * WebDriver Text field component class
 */
class TextField{

  /**
   * This css should be an <input> tag
   * @param css
   */
  constructor(css){
      this.css = css;
  }

  /**
   * Enter text value into the text boy
   * @param text
   */
  async enterText(text){
    await $(this.css).sendKeys(text);
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isType(type){
    return await $(this.css).getAttribute('type') === type;
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(){
    return await $(this.css).isPresent();
  }

  /**
   * Check the input tag is displayed
   * @returns {Promise<boolean|*>}
   */
  async isDisplayed(){
    return await $(this.css).isDisplayed();
  }

  /**
   * Clear contents of an input field
   */
  async clearField(){
    await $(this.css).clear();
  }

  /**
   * Get value of text box contents
   * @returns {Promise<String>}
   */
  async getText(){
    return await $(this.css).getAttribute('value');
  }

}

module.exports = TextField;
