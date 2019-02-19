/**
 * WebDriver checkbox field component class
 */
class CheckBox{

  /**
   * This css should be an <input> tag
   * @param css
   * @param selector
   */
  constructor(css, selector){
    this.css = css;
    this.selector = selector;
  }

  /**
   * Click value
   * @param text
   */
  async click(){
    await $(`${this.css} ${this.selector}`).click();
  }

  /**
   * Check the input tag is present
   * @returns {Promise<boolean|*>}
   */
  async isPresent(){
    return await $(`${this.css} ${this.selector}`).isPresent();
  }

  /**
   * Check the input tag is enabled
   * @returns {Promise<boolean|*>}
   */
  async isEnabled(){
    return await $(`${this.css} ${this.selector}`).isEnabled();
  }


}

module.exports = CheckBox;
