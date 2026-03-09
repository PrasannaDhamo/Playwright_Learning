/*  In playwright.config.ts file, we can specify multiple reporters to generate different types of reports for our test runs. 
Here's an example of how to configure multiple reporters in the Playwright configuration file:

export default defineConfig({
reporter: [
['list'], // Default list reporter
['line'], // Line reporter
['dot'], // Dot reporter
['html', { open: 'never', outputFolder: 'html-report' }], // HTML reporter with custom folder
['json', { outputFile: 'results.json' }], // JSON reporter
['junit', { outputFile: 'results.xml' }], // JUnit reporter
[MyReporter], // Custom reporter
],
});
 */

import {test,expect} from '@playwright/test';

test.beforeEach('launching app',async({page})=>{

await page.goto("https://demowebshop.tricentis.com/")

})

test('logotest', async ({ page }) => {
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
});

test('title test', async ({ page }) => {
    expect(await page.title()).toContain("Demo Web Shop1");
});

test('search test', async ({ page }) => {
    await page.locator('#small-searchterms').fill("laptop");  // fill teh text in search box
    await page.locator("input[value='Search']").click();      // click on the button
    await expect.soft(page.locator('h2 a').nth(0)).toContainText("laptop", { ignoreCase: true });
});