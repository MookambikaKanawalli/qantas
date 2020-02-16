const { BeforeAll, After, AfterAll, Status } = require("cucumber");
import { Hooks } from "cucumber";
import { browser } from "protractor";
import { config } from "../../protractor.config";

export = function (this: Hooks) {

  this.setDefaultTimeout(60000);

  this.After(async (_) => {
    browser.getAllWindowHandles().then((handles) => {
      browser.driver.close();
      browser.driver.switchTo().window(handles[0]);
  });
  });

  this.Before(async (_) => {
    browser.ignoreSynchronization = true;
    await browser.get(config.baseUrl);
  })
};
