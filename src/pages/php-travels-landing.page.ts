import { $, browser, ElementFinder, protractor } from "protractor";
const EC = protractor.ExpectedConditions;

export class LandingPage {

    public homePageFrontEnd: ElementFinder;
    public flights: ElementFinder;

    constructor() {
        this.homePageFrontEnd = $('.grey-box div:nth-child(1) .wow a small');
        this.flights = $('.text-center.flights');
    }

    public async open() {
        await browser.get('/demo/');
        return await browser.wait(EC.visibilityOf(this.homePageFrontEnd));
    }

    public async  bookFlights() {
        await this.homePageFrontEnd.click();
        await browser.sleep(2000);
        await this.switchToTabNumber(1);
        const url = await browser.getCurrentUrl();
        await browser.get(url);
        await browser.sleep(3000);
        await this.flights.click();
    }

    public async switchToTabNumber(tabIndex: number) {
        return await browser.getAllWindowHandles().then(async (handles) => {
            const newWindowHandle = handles[tabIndex];
            await browser.switchTo().window(newWindowHandle);
        });
    }
}
