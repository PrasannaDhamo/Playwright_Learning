import {test,expect, Page, chromium} from "@playwright/test";

test('Authenticated Popups', async()=> {
    const browser = await chromium.launch();
    const context = await browser.newContext({httpCredentials:{username:'admin', password:'admin'}});
    const page = await context.newPage();

    //await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForLoadState();//wait for page to load completely
})