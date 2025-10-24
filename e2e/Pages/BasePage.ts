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
}

export default BasePage;
