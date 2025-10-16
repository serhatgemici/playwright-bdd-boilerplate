# Introduction 
>The solution uses [playwright-bdd](https://vitalets.github.io/playwright-bdd/#/) framework.

# Pre-requisits
1. [Node.js and npm installed](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (required)
2. [Java JDK](https://www.oracle.com/java/technologies/downloads/) is installed (optional for running the tests, required for displaying Allure report)
3. [Allure Report](https://allurereport.org/docs/install/) is installed (optional for running the tests, required for displaying Allure report)

# Opening The Project 
 `qa.code-workspace` file contains the required configurations and plugins for VS Code to recognise and link feature files & step definitions together. Please open the project from this file in VS Code and accept the VS Code prompt for installing the required extensions. This setup will allow your IDE to recognise the feature files and let you CMD + click and display step definitions seamlessly.

# Installation:
1. Open the project using the `qa.code-workspace` file, then open Terminal and go to project root

2. Install node modules
```
npm i
```
3. Install Playwright browsers (in case you have an older version of Playwright installed)
```
npx playwright install
```
# To run the test
1. open terminal within the project root, type the following command and hit enter:
``` 
npm run open:dev:watch
```
This will do the following:
- generate spec files from the feature files listed under Features folder and place them under the `.features.gen` directory, 
- start the [Playwright Trace Viever](https://playwright.dev/docs/trace-viewer-intro)
- watch for file changes and reload the code into the test runner on file changes.

2. click play button
3. When using open mode, please use control + c in termimal to terminate the execution.

Or,

execute 
``` 
npm run test:dev:report
```
and this will run the tests in headless mode, generate Allure Report and serve it on your browser. Alternatively, you can use the built in test explorer in VS Code. 

**package.json** file contains a few pre-configured command scripts in the below fashion; **"test"** scripts run in headless mode in the background and only generate console output and report files, where **"open"** scripts run in trace viewer for debugging in interactable UI mode, and do not generate report files.
``` 
action:environment:option
```
**Where**
- **action** can be one of the 2 execution options that are **test** and **open**
- **environment** can be **dev**, **stage**, **local** (currently all options are configured for the same `https://www.jetbrains.com` url)
- **option** can be a further parameter for the tests, such e.g. watch means the runner will watch for file changes and reload the code and re-run the tests in the test runner.

**e.g.**
``` 
npm run test:dev:report
or
npm run open:dev:watch
```

# Project Structure
The project uses page object pattern. Feature files and step definitions are expected to be under `e2e/Features` directory, and same way the step definition files of the corresponding Feature files are expected to be under `e2e/StepDefinitions` directory; where Page objects are placed under the `e2e/Pages` directory, common step definitions are placed under the `StepDefinitions/Common` directory in `CommonStepDefinitions.ts` file.

``` 
/home/john.doe/my-project
├── .features-gen/
├── allure-report
├── allure-results
|
├── e2e/
|   ├── Data/
|   |
│   ├── Features/
│   │   ├── @FirstFeature.feature
│   │   └── @SecondFeature.feature
│   │
|   ├── Fixtures/
│   │   └── FixturesBDD.js
|   |
│   ├── Pages/
│   |   ├── ThisPage.js
│   |   └── ThatPage.js
|   |
│   └── StepDefinitions/
│       ├── @FirstFeature.js
│       └── @SecondFeature.js
|       └── Common/
|           └── CommonStepDefinitions.js
|   
├── test-results/
└── utils/
```

Step definitions which can be used in more than one feature are moved/placed into the `CommonStepDefinitions.ts` to be shared by multiple tests and to avoid code repetition. 

Page objects are kept in `Pages` folder under `e2e` directory and are written in `Page Object Model` manner; that is: `BasePage` contains the common objects and methods that will be used in every page. e.g. header objects, landing page, common popups etc. Every other page must have their own Page files and they can extend base page if they need to access common methods, in order to avoid code repetition.

**Directory Descriptions:**
- `DATA` contains the auxiliary files that contains data to be used in the tests. e.g. json files for request samples.
- `FEATURES` contains test suite, namely the `.feature` files.
- `FIXTURES` contains test fixture files
- `PAGES` contains the page files for page-object-model
- `STEPDEFINITIONS` contains the step definition files for cucumber tests.
- `STEPDEFINITIONS/COMMON` contains the common step definitions file.
- `UTILS` contains helper scripts.

# Test Reports
The solution is currently configured with the Allure reporter.

**How to manually generate Allure reports**
1. Run the tests (e.g. npm run test:dev). This will create an `allure-results` folder in  project root. 
2. Generate the allure report using the following command: `allure generate allure-results -o allure-report --clean` This will generate the `allure-report` folder in project root.
3. Open the Allure report using the following command: `allure open allure-report`

# Custom Tags
Custom tags can be added into the Feature files on the following sections/levels: 
- Feature
- Rule
- Scenario
- Scenario Outline
- Examples
and are used to indicate that they belong to a certain group of tests in a custom fashion e.g. `@checkoutOld`, `@NewLoginChanges`, `@smoke`, `@positive` etc. for filtering them on execution time.


E.g. `TAGS: @smoke` means, only the tests which are tagged as `@smoke` will be executed.

```
Tags can be used with and,or,not keywords.
```

E.g. `TAGS: "not @extras"` will run all the tests, except for the ones tagged as `@extras`

# Smart Tags (@skip, @only)
Predefined tags `@skip` and `@only`
  - `@skip` tag, skips a test.
  - `@only` tag, runs only the test with the `@only` tag.