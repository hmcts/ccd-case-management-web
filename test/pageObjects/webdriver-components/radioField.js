/**
 * WebDriver Radio field component class
 */
class RadioField{

  /**
   * This css should be an <input> tag
   * @param css
   */
  constructor(css){
      this.css = css;
  }

  /**
   * Click value
   * @param text
   */
  async click(){
    await $(this.css).click();
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(){
    return await $(this.css).isPresent();
  }

  /**
   * Check the input tag is enabled
   * @returns {Promise<boolean|*>}
   */
  async isEnabled(){
    return await $(this.css).isEnabled();
  }


}

module.exports = RadioField;
