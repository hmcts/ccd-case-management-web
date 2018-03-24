
class BrowserUtils {

    constructor() {

    browser.waitForAngular

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

    getValueByElementId(id) {

        let query = "return document.querySelector('" + id + "').value"

     //   browser.executeScript(query).then(function(v) { console.log("THE VALUES : " + v) })

        return browser.executeScript(query).then(function(v) { return v })

    }

    getSelectedOption(dropDownCss) {

        let valueOfSelectedOption = this.getValueByElementId(dropDownCss)

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

}

module.exports = BrowserUtils
