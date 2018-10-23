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


}

module.exports = TextField;
