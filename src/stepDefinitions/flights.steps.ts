import chai = require('chai');
import chaiAsPromised = require("chai-as-promised");
import { StepDefinitions, TableDefinition } from 'cucumber';
import { HomePage } from "../pages/php-travels-home.page";
import { LandingPage } from "../pages/php-travels-landing.page";



chai.use(chaiAsPromised as any);
const expect = chai.expect;

export = function (this: StepDefinitions) {

    const landingPage: LandingPage = new LandingPage();
    const homePage: HomePage = new HomePage();

    this.Given(/^.*? is planning to book flights from Php travels page$/, async () => {
        await landingPage.open();
        await landingPage.bookFlights();
    });

    this.When(/^.*? search for the available flights$/, async (table: TableDefinition) => {
        const rows = table.hashes();
        for (let i = 0; i < rows.length; i++) {
            await homePage.typeIntoFrom(rows[i].from);
            await homePage.typeIntoTo(rows[i].to);
            await homePage.selectDepartureDate();
            await homePage.selectAdult(parseInt(rows[i].adults, 10));
            await homePage.selectChild(parseInt(rows[i].child, 10));
            await homePage.selectInfant(parseInt(rows[i].infant, 10));
            await homePage.search();
        }
    });

    this.Then(/^.*? should see search results$/, async () => {
        await homePage.lookForResults();
    });

    this.When(/^.*? selects the first search result to book$/, async () => {
        await homePage.bookFlight();
    });

    this.When(/^completes the booking$/, async () => {
        await homePage.login();
        await homePage.acceptTerm();
        await homePage.confirmBooking();
        await homePage.getInvoice();
    });


    this.When(/^.*? should get booking INVOICE with flight details$/, async () => {
        await homePage.getInvoice();

    });


};