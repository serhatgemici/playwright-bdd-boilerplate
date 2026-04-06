import { defineConfig, devices, PlaywrightTestConfig, ReporterDescription } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import * as os from 'os';

const testDir = defineBddConfig({
  features: ['e2e/Features/*.feature'],
  steps: [
    'e2e/StepDefinitions/*.ts',
    'e2e/StepDefinitions/Common/*.ts',
    'e2e/Fixtures/FixturesBDD.ts',
  ],
  aiFix: {
    promptAttachment: true,
  },
});

// List of reporters
const reporters: ReporterDescription[] = [
  [
    'allure-playwright',
    {
      detail: false,
      outputFolder: 'pw-allure-report',
      suiteTitle: true,
      environmentInfo: {
        os_platform: os.platform(),
        os_release: os.release(),
        os_version: os.version(),
        node_version: process.version,
      },
    },
  ],
];

const config: PlaywrightTestConfig = defineConfig({
  testDir,
  reporter: reporters,
  retries: process.env.CI ? 1 : 1,
  timeout: 120000, // overal timeout for each test
  expect: {
    timeout: 13000, //timeout for expect assertions
  },
  fullyParallel: true,
  workers: process.env.CI ? 4 : 3,
  projects: [
    {
      name: 'Develop',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.automationexercise.com',
      },
    },
    {
      name: 'Stage',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.automationexercise.com',
      },
    },
    {
      name: 'Local',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.automationexercise.com',
      },
    },
    {
      name: 'Production',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.automationexercise.com',
      },
    },
  ],

  use: {
    actionTimeout: 12000,
    navigationTimeout: 60000,
    trace: 'on-first-retry', // record traces on first retry of each test // disabled temporarily
    screenshot: 'only-on-failure', // save screenshots on failure
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
    video: {
      mode: 'retain-on-failure', // record video for each test, but only keep it if the test fails
      show: {
        actions: { position: 'top-left' },
        test: { position: 'top-right' },
      },
    },
    testIdAttribute: 'data-qa', // set a custom attribute to uniquely identify elements in the application, instead of using default attributes like 'data-testid' or 'data-test-id'
  },
});

export default config;
