//  In cofig file need to add these for global
// Collect screenshot, video and trace when test fails and retrying the failed test. 
    
    //  screenshot: 'only-on-failure', // Options: 'on', 'off', 'only-on-failure', 'on-first-failure'
    //  video: 'on-first-retry', // Options: 'on', 'off', 'retain-on-failure', 'on-first-retry'

/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'retain-on-failure', //Options: 'on', 'off', 'retain-on-failure', 'on-first-retry', 'on-all-retries', 'retry-with-trace', 'retain-on-first-failure'

// Evrything will be saved in the default output folder - "test-results" and inside that folder, there will be a folder for each test run with the name of the test and a unique identifier. 
// Inside that folder, we can find the screenshots, videos and traces for that test run. We can also specify a custom path for screenshots, videos and traces in the config file or in the test block.

import { test, expect} from '@playwright/test';

test('Screenshot Demo', async ({ page }) => {
    await page.goto('https://demowebshop.tricentis.com/');
    const datenow = Date.now();
    await page.screenshot({ path: `screenshots/screenshot-${datenow}.png`});
    await page.screenshot({ path: `screenshots/screenshot2-${datenow}.png`, fullPage: true });

    const img = page.locator('div.center-3');
    await img.screenshot({ path: `screenshots/screenshot3-${datenow}.png`});
})

test.only('tracing', async ({ page, context }) => {
  context.tracing.start({ screenshots: true, snapshots: true }); //To start tracing with screenshots and snapshots

  await page.goto('https://www.demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');

  context.tracing.stop(); //To stop tracing and save the trace file in the default output folder - "test-results".
});