/* To change the timeout globally for all tests, default is 30 seconds
In config file add - timeout: 60000,
for setting the timeout for a specific test, we can use test.setTimeout(60000) inside the test block */

/* To change the default timeout globally for all assertions, default is 5 seconds
In config file add - expect: { timeout: 10000 },
for setting the timeout for a specific assertion, we can use expect().toHaveText('example', { timeout: 60000 }) inside the test block */

import { test, expect } from '@playwright/test';

test('Autowaiting and forcing', async ({ page }) => {
 
  test.setTimeout(50000); // 50 secs
  //test.slow(); // 90 secs  ( Defaul is 30 secs) // triple the timeout for this test

  await page.goto('https://demowebshop.tricentis.com/');

  //Assertions - Auto wait works
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/",{timeout:10000}); 
  await expect(page.locator('text=Welcome to our store')).toBeVisible({timeout:10000}); 

  //Actions - Auto wait works
  await page.locator('#small-searchterms').fill("Laptop",{force:true}); //search box - Force action( it will not so actionalibity checks)
  await page.locator('.button-1.search-box-button').click({force:true}); // clicking on search button -Force action

});

test('Playwright Assertions Demo', async ({ page }) => {
  await page.goto('https://demowebshop.tricentis.com/');

  // 1. Auto-retrying assertion (automatically retries until it passes or times out)
  await expect(page).toHaveURL("https://demowebshop.tricentis.com/"); // waits for correct URL

  // Auto-retry: waits for the element to be visible and have the expected text
  await expect(page.locator('text=Welcome to our store')).toBeVisible();
  await expect(page.locator("div[class='product-grid home-page-product-grid'] strong")).toHaveText('Featured products');


  // 2. Non-retrying assertion (executes immediately, no retry)
  const title = await page.title();
  expect(title.includes('Demo Web Shop')).toBeTruthy(); // no auto-retry

  const welcometext = await page.locator('text=Welcome to our store').textContent();
  expect(welcometext).toContain('Welcome'); // non-retrying

  
  // 3. Negating matcher ( applicable for both auto-retrying & Non-retrying assertions)
   await expect(page.locator('text=Welcome to our store')).not.toBeVisible(); // auto-retry
   expect(welcometext).not.toContain('Welcome'); // no auto-retry

   await page.waitForTimeout(5000);
});


/*By default, failed assertion will terminate test execution. 
Playwright also supports soft assertions 
failed soft assertions do not terminate test execution, but mark the test as failed. */

test('Hard Vs Soft assertions', async ({ page }) => {

    await page.goto('https://demowebshop.tricentis.com/');

    //Hard assertions
    /*await expect(page).toHaveTitle('Demo Web Shop2'); //failed
    await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
    
    const logo= page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect(logo).toBeVisible();
    */

    //Soft assertions
    await expect.soft(page).toHaveTitle('Demo Web Shop2'); //failed
    await expect.soft(page).toHaveURL('https://demowebshop.tricentis.com/');
    
    const logo= page.locator("img[alt='Tricentis Demo Web Shop']");
    await expect.soft(logo).toBeVisible();

    await page.waitForTimeout(5000);
});