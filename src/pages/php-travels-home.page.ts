import chai = require('chai');
import chaiAsPromised = require("chai-as-promised");
import { browser, by, ElementFinder, protractor } from "protractor";
import configJson from '../../config/credentials-config.json';

const EC = protractor.ExpectedConditions;
chai.use(chaiAsPromised as any);
const expect = chai.expect;

export class HomePage {

    public from: ElementFinder;
    public fromInput: ElementFinder;
    public selection: string;
    public dateSelection: string;

    public to: ElementFinder;
    public toInput: ElementFinder;
    public dateEle: ElementFinder;
    public searchButton: ElementFinder;

    public childPlus: ElementFinder;
    public adultPlus: ElementFinder;
    public infantPlus: ElementFinder;
    public resultsSummary: ElementFinder;
    public bookFirstResult: ElementFinder;
    public userName: ElementFinder;
    public pwd: ElementFinder;
    public acceptTermChkBox: ElementFinder;
    public confirmButton: ElementFinder;
    public invoice: ElementFinder;

    constructor() {
        this.from = browser.element(by.css("div[id='s2id_location_from']"));
        this.fromInput = browser.element(by.css("#select2-drop > div > input"));
        this.selection = ".select2-drop .select2-results li:nth-child(1)";
        this.dateSelection = ".datepicker.-bottom-left-.active .datepicker--cells .-current-";

        this.to = browser.element(by.css("div[id='s2id_location_to']"));
        this.toInput = browser.element(by.css("#select2-drop > div > input"));
        this.dateEle = browser.element(by.css("input[id='FlightsDateStart']"));
        this.searchButton = browser.element(by.css("div[id='flights']  button[type='submit']"));

        this.childPlus = browser.element(by.css("#flights > div > div > form > div > div.row.no-gutters.mb-15.align-items-end.row-reverse > div:nth-child(3) > div > div > div:nth-child(2) > div > div.form-icon-left > div > span > button.btn.btn-white.bootstrap-touchspin-up"));
        this.adultPlus = browser.element(by.css("#flights > div > div > form > div > div.row.no-gutters.mb-15.align-items-end.row-reverse > div:nth-child(3) > div > div > div:nth-child(1) > div > div.form-icon-left > div > span > button.btn.btn-white.bootstrap-touchspin-up"));
        this.infantPlus = browser.element(by.css("#flights > div > div > form > div > div.row.no-gutters.mb-15.align-items-end.row-reverse > div:nth-child(3) > div > div > div:nth-child(3) > div > div.form-icon-left > div > span > button.btn.btn-white.bootstrap-touchspin-up"));

        this.resultsSummary = browser.element(by.css("p.text-muted.post-heading"));
        this.bookFirstResult = browser.element(by.css("ul[id='LIST'] li button[type='submit']"));
        this.userName = browser.element(by.css("input[id='username']"));
        this.pwd = browser.element(by.css("input[id='password']"));
        this.acceptTermChkBox = browser.element(by.xpath("/html/body/div[2]/div[1]/div[1]/div/div/div[1]/div[2]/div/form/div[5]/label"));
        this.confirmButton = browser.element(by.id("confirmBooking"));

        this.invoice = browser.element(by.css("#invoiceTable > table:nth-child(3) > tbody > tr > td > div:nth-child(1) > table > tbody > tr > td > div:nth-child(1)"));
    }

    public async typeIntoFrom(from: string) {
        await browser.sleep(1000);
        await browser.wait(EC.visibilityOf(this.from));
        await this.from.click();
        await browser.sleep(500);
        await this.fromInput.sendKeys(from)
        await browser.sleep(1000);
        try {
            const selection = await browser.element(by.css(this.selection))
            if (selection.isPresent()) {
                await selection.click();
            }
        } catch (e) {
            expect.fail("Please enter valid origin")
        }
    }

    public async typeIntoTo(to: string) {
        await this.to.click();
        await browser.sleep(1000);
        await this.toInput.sendKeys(to)
        await browser.sleep(4000);
        try {
            const selection = await browser.element(by.css(this.selection))
            if (selection.isPresent()) {
                await selection.click();
            }
        } catch (e) {
            expect.fail("Please enter valid destination")
        }
    }

    public async selectDepartureDate() {
        await this.dateEle.click();
        await browser.sleep(1000);
        return await browser.findElement(by.css(this.dateSelection)).click();
    }

    public async search() {
        await this.searchButton.click();
    }

    public async selectAdult(numbOfAdults: number) {
        for (let i = 1; i < numbOfAdults; i++) {
            await this.adultPlus.click();
            await browser.sleep(500);
        }
    }

    public async selectChild(numbOfChildren: number) {
        for (let i = 0; i < numbOfChildren; i++) {
            await this.childPlus.click();
            await browser.sleep(500);
        }
    }

    public async selectInfant(numbOfInfant: number) {
        for (let i = 0; i < numbOfInfant; i++) {
            await this.infantPlus.click();
            await browser.sleep(500);
        }
    }

    public async lookForResults() {
        const results = await this.resultsSummary.getText();
        const count = results.split('')[0];
        if (count == '0') {
            expect.fail("No results found");
        }
    }

    public async bookFlight() {
        await this.bookFirstResult.click();
        // Assert for scenarios here
    }

    public async login() {
        await this.userName.sendKeys(configJson.uid);
        await this.pwd.sendKeys(configJson.pwd);
    }
    public async acceptTerm() {
        await browser.executeScript("window.scrollBy(0,1400)");
        await browser.sleep(2000);
        await this.acceptTermChkBox.click();
    }

    public async confirmBooking() {
        await this.confirmButton.click();
    }

    public async getInvoice() {
        await browser.wait(EC.visibilityOf(this.invoice));
        const invoice = await this.invoice.getText();
        expect(invoice).to.eql("INVOICE");
    }
}
