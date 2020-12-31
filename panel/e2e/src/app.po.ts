import { browser, by, element } from 'protractor';

export class AppPage {

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }
}
