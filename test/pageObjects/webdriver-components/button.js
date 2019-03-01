
/**
 * WebDriver Button component class
 */
class Button{

  /**
   * This css should be an <button> tag
   * @param css
   */
  constructor(css){
    this.css = css;
  }

  /**
   * Checks if the button is enabled
   * @returns {Promise<Boolean>}
   */
  async isEnabled(){
      return await $(this.css).isEnabled();
  }

  /**
   * Click Button element
   */
  async click(){
      await $(this.css).click();
      await browser.waitForAngular()
  }

  /**
   * Gets button text
   * @returns {Promise<String>}
   */
  async getText(){
    return await $(this.css).getText();
  }

  async isDisplayed(){
    let displayed = null;
    try {
      displayed = await $(this.css).isDisplayed();
    } catch (e) {
      if (e.name === 'NoSuchElementError'){
        displayed = false; //element not present so not displayed
      }
      else {
        throw new CustomError(e);
      }
    }

    return displayed
  }


}

module.exports = Button;
