BrowserUtils = require('../utils/browser.utils.js')

class CCDBanner {

    constructor() {

       this.browserUtils = new BrowserUtils

       this._bannerHeaderTitle = by.css('.header-title');
       this._userName = by.css('.dropbtn')
       this._userNameDropDown = by.css('.dropdown-content')
       this._menuItems = by.css('#menu-links a')
       this._searchBox = by.css('#search a')
       this._footer = by.css('#footer-wrapper')

    }

    isLoaded() {

        browser.waitForAngular
        this.browserUtils.waitForPageElemToLoad(element(this._bannerHeaderTitle))
        this.browserUtils.waitForPageElemToLoad(element(this._userName))

    }

    getTitleLabel() {

        return element(this._bannerHeaderTitle).getText()

    }

    getUserNameLabel() {

        return element(this._userName).getText()
    }

    getMenuItemsLabels() {

        return element.all(this._menuItems).getText()

    }

    getSearchBoxLabel() {

        return element(this._searchBox).getText()

    }

    clickSearchBoxLabel() {

            return element(this._searchBox).click()

    }

    getFooterText() {

        return element(this._footer).getText()

    }



}

module.exports = CCDBanner

