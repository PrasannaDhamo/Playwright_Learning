import {test, expect} from '@playwright/test';

test('Verify Page URL', async ({page}) => {
    await page.goto('https://www.google.com');
    let URL:string = page.url();
    console.log(URL);
    await expect(page).toHaveURL(/google/); // regular expression
});
