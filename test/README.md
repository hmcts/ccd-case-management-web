# Functional Tests
Guide to the front end functional test framework for ccd-case-management-web. This framework is a Javascript framework using Protractor to interact with web pages implementing the Page Object pattern and put together with CucumberJs

## Contents

  * [Getting Started](#getting-started)
     * [Prerequisites](#prerequisites)
     * [Running the tests](#running-the-tests)
        * [troubleshooting](#troubleshooting)
           * [no connection?](#no-connection)
  * [Framework Layers &amp; Structure](#framework-layers--structure)
     * [Page Object Model](#page-object-model)
     * [Cucumber](#cucumber)
     * [Layers &amp; Structure](#layers--structure)
        * [Feature files](#feature-files)
        * [Step Definitions](#step-definitions)
        * [Page Objects](#page-objects)
        * [BasePage.js](#basepagejs)
        * [BaseSteps.js](#basestepsjs)
        * [ccd-components](#ccd-components)
        * [webdriver-components](#webdriver-components)
     * [Reporting](#reporting)
  * [Developing Tests](#developing-tests)
    * [1. Creating Scenario](#1-creating-scenario)
    * [2. Use or Create Step Definitions](#2-use-or-create-step-definitions)
       * [Implementing Step Definitions](#implementing-step-definitions)
          * [Assertions](#assertions)
          * [Abstracting similar steps](#abstracting-similar-steps)
          * [Sharing Data Between Steps](#sharing-data-between-steps)
    * [3. Use or Create Page Objects](#3-use-or-create-page-objects)
      * [selectors](#selectors)
      * [naming convention](#naming-convention)
      * [BasePage](#basepage)
    * [Tagging](#tagging)
      * [conditionals](#conditionals)
    * [Definition file](#definition-file)
  * [Pipeline](#pipeline)
      * [Debugging](#debugging)
  * [Built With](#built-with)


## Getting Started

These instructions will get the functional tests running on your local machine for development and testing purposes, the tests can point to a local instance of ccd (ccd-docker) or an external instance such as AAT. See pipeline for notes on how to run the tests in the pipeline.

### Prerequisites

The tests will require the following environmental variables in order to run. To make it easier for future use you can also export these in your `.bash_profile`


| Name | Description |
|------|-------------|
| CCD_CASEWORKER_AUTOTEST_FE_EMAIL | Username for test account |
| CCD_CASEWORKER_AUTOTEST_FE_PASSWORD | Password for tests account |
| TEST_URL | Target URL to test against (default if not set is local ccd-docker url) |


### Running the tests

The functional tests use both Protractor with Cucumber. Individual tests/scenarios are tagged with annotations eg `@functional` and are executed agaist a run config file (`conf.js` or local.conf.js) via the CLI like so:

`protractor test/config/local.conf.js --cucumberOpts.tags='@functional'`

ommiting the tags will run all the tests

#### troubleshooting
##### no connection?
If you are running against local docker and the browser wont connect or showing no connection error, you may be configured to use a proxy which you will need to comment out of the `test/config/local.conf.js` the line for the proxy is:

```
     'proxy': {
      'proxyType': 'manual',
      'httpProxy': 'proxyout.reform.hmcts.net:8080',
      'sslProxy': 'proxyout.reform.hmcts.net:8080',
      'noProxy': ''
    },
```
Note: you will need the proxy if you are running the test against AAT

##### Multiple browser windows 
The test are configured to open up a browser window for each feature file. this may result in several browser windows opening and closing when you are just working on a single test. you can mitigate this by changing the line below in the `local.conf.js` to point to the specific feature file you are working on instead of the wildcard/all features
```
  specs: [
    '../features/*.feature',
    '../features/*/*.feature'
  ],
```
##### My tests can't find the nav bar links(create case, case list)?
The links are in different places for a solicitor user. make sure you are using a caseworker user only

## Framework Layers & Structure

### Page Object Model   
This framework uses the [Page Object Design Pattern](https://github.com/SeleniumHQ/selenium/wiki/PageObjects) which briefly means each UI web page is modeled as a class containing all services of this page. Interacting with this page in a test should only be done through this class.

### Cucumber
Cucumber is used to write tests, called `Scenarios` in plain english in *Given When Then* format with each line automated with a corrosponding `Step Definition` that implements the action stated in the `sceanrio`

### Layers & Structure
![structure diagram](https://github.com/hmcts/ccd-case-management-web/blob/test-docs/test/resources/framework-structure.png)
#### Feature files
Files that contain tests or `Sceanrios`. files must end in `.feature`
#### Step Definitions
JS classes that contain the `Step Definitions` implementing steps from `feature file` `Sceanrios`
#### Page Objects
JS classes encapsulating functionality of a web page and all interactions with that web page. These classes are called from `Step Definiiton` classes only.
#### BasePage.js
Containing functionality for interacting with a web page, not page specific, may include timeouts or getting the text of an element, can be applied to any page. *All* `Page Object` classes should extend `BasePage.js`. Common functionality for pages should be abstracted here.
#### BaseSteps.js
Containing common functionality/methods that can be used across different `Step Definition` files eg basic navigation. A `Step Definition` cannot be called from another `Step Definition` so this class contains only JS functions to be called from `Step Definitions` in `Step Definition` classes
#### ccd-components
It may sometimes be sensible to abstract a component out of a `Page Object` where that component can be found in multiple places. for example the main navigation page is accessible from every page so rather than having duplicated methods to interact with this navigation across many `Page Objects` we can extract the functionality into it's own component. Then have the `Page Objects` return an instance of this so the functionality can be access from that PO

#### webdriver-components
To reduce duplicated code we should abstract functionality around a basic web component into a separate class so we can write reusable functionality to interact with the web component. We could also start to put in logging or extra functionality here which would cascade down to be used across the whole framework. Examples of web components are *dropdown bar, button, link, radio button, text field*

### Reporting
reporting is configured to automatically generate a report on each test run. the configuration for the report can be found in the `local.conf` file and the actual reports are generated in the `test/results/` dir. Local reports come equiped with screenshots on test failure for a `Scenario`.

## Developing Tests

#### 1. Creating Scenario
We start with our Scenario which is our test written in [Gherkin](https://docs.cucumber.io/gherkin/reference/) syntax. These should be created by either or a combination of QA, BA and/or developers and should preferably be signed of by one of each party but more importantly by a BA. These should be created from the JIRA Story being worked on

Put the `Scenarios` into an exiting `Feature` file which should be a grouping of scenarios testing similar behaviors. Create a new feature file if needed. Location for `Feature` files: `test/features/`

For more information on writing `Feature files`, `Scenarios` and `Gherkin` syntax click [here](https://docs.cucumber.io/gherkin/reference/)

#### 2. Use or Create Step Definitions

If a scenario step is not already implemented in an existing `Step Definition` file we will need to create a new one. Either inset into an existing `Step Definition` file or create a new file if the existing files do not look like an suitable place based on area of the application those steps apply to. A good rule of thumb would be to have a `Step Definition` file per domain area

##### Implementing Step Definitions
Step definition files should only be using functions from `Page Objects` or other helper methods from within the `Step Definition` class or from `BaseSteps.js` Use page objects to navigate through the application wait for conditions where applicable to complete the Step

###### Assertions
When implementing a `Then` step we need an assertion, assertions should always be done in the Step Definition level and never the `Page Objects`. We will usually get using the `Page Objects` to return a value we are asserting against or we may be returning a boolean we asserting true/false. Use the [chai-as-promised](https://www.chaijs.com/plugins/chai-as-promised/) library.

###### Abstracting similar steps
Sometimes we may find similar steps that contain similar but not exactly the same functionality, we cannot call steps from steps so in this instance we may want to move code from the Step to a helper method in the same class, which can then be called by the step(s). If the functionality is generic it and could be across many domain areas then it can be moved to `BaseSteps.js` which all `Step Definition` classes extend and so have access to

###### Sharing Data Between Steps
If we really need to share data between steps we can create an object at the top of a Step Definition class and set the value in one Step and get and use the value in another

If we are sharing between `Step Definiton` files then we may want to use an external class for example `test/utils/TestData.js`

NOTE: It is preferable to create a new Step Definition rather than piece together an existing Step that makes the Scenario less readable. The Scenario layer is the most important part of the test.

For more information on writing `Step Definitions` click [here](https://docs.cucumber.io/cucumber/step-definitions/)  
For more information on `Step Definition` organization click [here](https://docs.cucumber.io/gherkin/step-organization/)

#### 3. Use or Create Page Objects
when implementing your Steps either use existing function from a page object or create a new one. a locator for an element is defined in the constructor. then create a function using that that locator to be used called from your Step.

if a component on a page may be reused across other pages then we may want to abstract it into `ccd-component` class and call that component from our page to avoid code duplication. A good example is the navigation and footer being on most pages. We would still want to call the abstracted class through the `Page Object` page so that it is clear what page we are interacting with it on. If a page has a highly complex component we may also want to abstract it into it's own component to reduce the `Page Object` class size
Eg: we Have the NavBar class with functionality for the Navigation bar. The CaseListPage class exposes the NavBar through a function.

```
//ccd-component Class
class NavBar {

  constructor() {
    this._createCaseLink = '#menu-links-left li:nth-of-type(2) a';
  }

  async clickCreateCaseLink() {
    await $(this._createCaseLink).click();
    return new CreateCaseStartPage;
  }
  
}
```
```
//Page Object Class
class CaseListPage extends BasePage {
  
  getNavBarComponent() {
    return new NavBar;
  }
  
}
```
We may have a line like this in our `Step Definition` in order to access the Navigation Bar functionality making it clear we are on the Case List page and clicking the Create Case link on the navigation bar:  
```
await caseListPage.getNavBarComponent().clickCreateCaseLink();
```

When dealing with basic web elements (eg *dropdown bar, button, link, radio button, text field etc*) it is better to model these as a `webdriver-component` (`test/pageObjects/webdriver-components/`). Here we use a class such as `button.js`, this class will hold all functionality around interacting with a button which can be be subsequently called anytime we are interacting with any button helping to reduce duplication. Always try to parse the `css` to the `webdriver-component` class rather than pass an `element`

Eg `Dropdown` class encapsulates functionality around a dropdown box. The CaseDetailsPage uses this for the Actions dropdown and now has access to all the methods around dropdowns rather than having to implement itself in the class:

```
//webdriver-component Class
class Dropdown {

async selectFromDropdownByText(dropdownOption) {
    ...
  }

}
```

```
//Page Object Class
class CaseDetailsPage extends BasePage {

  constructor() {
    super();
    this._actionsDropdown = new Dropdown('ccd-event-trigger select');
    this._goButton = new Button('ccd-event-trigger button');
  }

  async startEvent(event){
    await this._actionsDropdown.selectFromDropdownByText(event);
    await this._goButton.click()
  }
}
```

###### selectors
Where possible use `css` selectors and avoid XPath. Many abstracted classes (see below) take a `css` selector as a constructor argument when initalised and so using other selectors may break this pattern.


###### naming convention
Name functions for page objects based on the action on the page they are performing. such as `ClickApplyButton` `GetLabelText` `EnterIntoTextDateField` so it is clear in the Steps what actions on the page are being done.


###### BasePage
All `Page Objects` extend `BasePage` which contains functionality that could be applied to any page, if find yourself writing  functionality that could be applied to _any_ page then move it to `BasePage`

For more information on `Page Objects` click [here](https://github.com/SeleniumHQ/selenium/wiki/PageObjects)

### Tagging
We can group tests for execution by using tags on the scenario. Tagging above a `Sceanrio` will tag that specific `Scenario`. Tagging at the top of a `Feature` file above the `Feature` keyword will have the effect of tagging every `Scenario` in that file

follow these simple guidelines for tagging:
- To add a `Scenario` to the functional test pack tag it  `@functional`  
- To add a `Scenario` to the smoke pack tag it `@smoke`  
- Tag your `Sceanrio` or `Feature` by domain grouping so tests covering a certain area of the application can be easily run on demand eg `@search` to quickly run all tests relating to search
- Tag your `Sceanrio` with the JIRA tag for the story it relates to if applicable
- If a `Sceanrio` is failing due to a bug tag it `@bug` and also with the JIRA bug id too
- If a `Sceanrio` is broken for some reason tag it `@broken`

###### conditionals
Tags can be run in a conditional way. we can run groupings of certain tags but exclude other tags. for example the following param to the cli will run all `@functional` tests but exclude any `@bug` or `@broken`

`--cucumberOpts.tags='@functional and not @bug and not @broken'`

For more information on `Cucumber` tags click [here](https://docs.cucumber.io/cucumber/api/#tags)

### Definition file
We currently have  a master definition file that we write our tests against. when writing new tests, see if the existing case types suit your needs, if not, unless it is a small change you should create a new case type which you can then use to tests agaist in your new functional tests. don't forget to commit your updated definition file incrementing the version in the file name. 

**NOTE: At the moment the definition needs to be manually uploaded to AAT and does not get uploaded as part of test setup**

File location: `test/resources/definitionsFiles`


## Pipeline
the pipeline is automatically configured to run the commands `test:smoke` and `test:functional` which relate to scrips that can be found in the `package.json`. We use the pipeline vault to set the env vars needed for test execution. `TEST_URL` is generate dynamically. There is an intermediate bash script that wraps that that will print out the values of the requires env vars so they can be debugged in the jenkins console log.

###### Debugging
If there are test failures it can be a good idea to run the tests from your local but pointing to the AAT URL so you can see the tests run for yourself, you will also be able to see screenshots on test failure on your local report

#### Debugging tests locally

If you needed to debug the tests please follow the steps:
1) In `local.conf.js` `specs` array at the top instead of `['../features/*.feature', '../features/*/*.feature']` type the feature file you will be debugging (that avoids starting the browser multiple times just to stop it as the features in feature files would be commented out)
2) Run the following in cmd line: `node --inspect-brk node_modules/protractor/bin/protractor test/config/local.conf.js --cucumberOpts.tags=@search`
3) Open url in browser: `chrome://inspect/#devices`
4) In the `Remote Target` section click `Inspect` on your started node process which will open `chrome-devtools` debugger
5) Make sure you add `test` folder to workspace in `chrome-devtools` debugger (`+ Add folder to workspace` on left side)
6) Set breakpoints in steps or PO js
7) Run with F8

Notes: If you have a following error:
```
14:22:08] E/local - Error code: 135
[14:22:08] E/local - Error message: No update-config.json found. Run 'webdriver-manager update' to download binaries.
[14:22:08] E/local - Error: No update-config.json found. Run 'webdriver-manager update' to download binaries.
```
make sure you run the following command (mentioned in here https://github.com/angular/webdriver-manager/issues/269):
```
chrome_version() {
    /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --version | tr -d 'Google Chrome'
}
./node_modules/protractor/bin/webdriver-manager update --versions.chrome=$(chrome_version)
```

If you want to debug locally a useful change is to increase timeout from 60 s to some higher value. This can be done for all steps globally in `testSetup.js`:

```
let {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
```

You have to also remember to install protractor in your project: `yarn install protractor`

## Built With

* [Protractor](https://www.protractortest.org/#/api) - end-to-end test framework for Angular applications
* [Cucumber](https://docs.cucumber.io/) - runs automated acceptance tests written in a BDD style.
* [chai-as-promised](https://www.chaijs.com/plugins/chai-as-promised/) - assertion library
