
class BrowserUtils {

    constructor(loc, waitToLoadYN) {

          if (waitToLoadYN==true)
          {
                  let EC = protractor.ExpectedConditions;
                  browser.wait(EC.visibilityOf(element(loc)), 5000);

                   // console.log(loc)
          }

    }

    waitForPageElemToLoad(el) {

        let EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeClickable(el), 5000);

    }

   waitForUrlToChangeTo(urlRegex) {
        var currentUrl;

        browser.getCurrentUrl().then(function storeCurrentUrl(url) {
                currentUrl = url;
            }
        ).then(function waitForUrlToChangeTo() {
                return browser.wait(function waitForUrlToChangeTo() {
                    return browser.getCurrentUrl().then(function compareCurrentUrl(url) {
                        return urlRegex.test(url);
                    });
                });
            }
        );

    }

    getValueByElementCss(css) {

        let query = "return document.querySelector('" + css + "').value"

        return browser.executeScript(query).then(function(v) { return v })

    }

    getSelectedOption(dropDownCss) {

        let valueOfSelectedOption = this.getValueByElementCss(dropDownCss)

        let cssForOption = valueOfSelectedOption
                    .then(function(css){return dropDownCss + ' option[value="' +  css + '"]'})

        return cssForOption
                   .then(function(css) { return element(by.css(css)).getText()})

    }

    selectOption(dropDownCss, optionText) {

        let el = element.all(dropDownCss)

                     .each(function(option) {

                              option.getText().then(function(text) {

                              if (text==optionText) { option.click()  }

                     })

        })
    }

    clickableAndWithLabel(el, label) {

        browser.waitForAngular

        return (element(el).isDisplayed() ? element(el).getText().then(function(tx) { return  Boolean(tx===label) }) : false);

    }

    enabledAndWithLabel(el, label) {

        browser.waitForAngular
        expect(element(el).getText()).toBe(label)
        return element(el).isEnabled()

    }

}

module.exports = BrowserUtils
