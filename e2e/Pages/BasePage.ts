import { Page } from '@playwright/test';

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

  async clickButtonByName(name: string) {
    await this.page.getByRole('button', { name }).click();
  }

  async clickButtonByText(text: string) {
    await this.page.locator(`button:has-text("${text}")`).click();
  }

  async clickLinkByText(linkText: string) {
    await this.page.locator(`a:has-text("${linkText}")`).click();
  }

  async validateTextVisibility(elementText: string, state: string) {
    const element = this.page.getByText(elementText);
    if (state === 'visible') {
      await element.waitFor({ state: 'visible' });
    } else if (state === 'hidden') {
      await element.waitFor({ state: 'hidden' });
    } else {
      throw new Error(`Invalid state: ${state}. Expected "visible" or "hidden".`);
    }
  }
}

export default BasePage;
