BrowserUtils = require('../utils/browser.utils.js')

class CCDBanner extends BrowserUtils {

    constructor() {

       super("", false)

       this._bannerHeaderTitle = by.css('.global-header .title');
       this._userName = by.css('.header-proposition .dropbtn')
       this._userNameDropDown = by.css('.header-proposition .dropdown-content')
       this._menuItems = by.css('.global-navigation cut-nav-item a')
       this._searchBox = by.css('.global-navigation .cut-nav-bar #search')
       this._footer = by.css('.footer-wrapper')

    }

    isLoaded() {

        browser.waitForAngular
        this.waitForPageElemToLoad(element(this._bannerHeaderTitle))
        this.waitForPageElemToLoad(element(this._userName))

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

