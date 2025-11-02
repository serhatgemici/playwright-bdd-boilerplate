import { expect, Page, Locator } from '@playwright/test';
import * as commonConstants from './CommonConstants';
import { readAriaSnapshot } from '../../../utils/readAriaSnapshot';

class BasePage {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // METHODS
  async visitSUT(): Promise<void> {
    await this.page.goto('/');
  }

  async navigateTo(route: string): Promise<void> {
    await this.page.goto('/' + route);
  }

  async clickLinkByName(name: string): Promise<void> {
    await this.page.getByRole('link', { name }).click();
  }

  async clickByCoordinates(x: number, y: number) {
    await this.page.mouse.click(x, y);
  }

  checkForCriticalConsoleErrors() {
    const criticalErrors: string[] = [];
    this.page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        criticalErrors.push(text);
      }
    });

    if (criticalErrors.length > 0) {
      throw new Error(`Critical console errors found: \n${criticalErrors.join('\n')}`);
    } else {
      console.log('No critical console errors found.');
    }
  }

  async validateHeading(expectedText: string): Promise<void> {
    await expect(this.page.getByRole('heading', { level: 1 })).toHaveText(expectedText);
  }

  async validateElementDisplayed(locator: Locator, state: string): Promise<void> {
    if (state === commonConstants.DISPLAYED) {
      await expect(locator).toBeVisible();
    } else if (state === commonConstants.NOT_DISPLAYED) {
      await expect(locator).toBeHidden();
    } else {
      throw new Error(
        `Invalid state: ${state}. Valid states are "${commonConstants.DISPLAYED}" or "${commonConstants.NOT_DISPLAYED}".`
      );
    }
  }

  async validateAriaSnapshot(locator: Locator, ariaFileName: string): Promise<void> {
    const snapshot = await readAriaSnapshot(ariaFileName);
    await expect(locator).toMatchAriaSnapshot(snapshot);
  }
}

export default BasePage;
