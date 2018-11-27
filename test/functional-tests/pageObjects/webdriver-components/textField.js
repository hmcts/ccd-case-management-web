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
