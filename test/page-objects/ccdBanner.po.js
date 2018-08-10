BrowserUtils = require('../utils/browser.utils.js')

class CCDBanner extends BrowserUtils {

    constructor() {

       super("", false);

       this._bannerHeaderTitle = by.css('.global-header .title span');
       this._userName = by.css('div #user-name');
       this._menuItems = by.css('.global-navigation cut-nav-item a');
       this._searchBox = by.css('.global-navigation .cut-nav-bar #search');
       this._footer = by.css('.footer-wrapper');
       this._signOut = by.css('div #sign-out');

    }

    isLoaded() {

        browser.waitForAngular
        this.waitForPageElemToLoad(element(this._bannerHeaderTitle))
        this.waitForPageElemToLoad(element(this._userName))

    }

    clickSignOut() {
        element(this._signOut).click();
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

