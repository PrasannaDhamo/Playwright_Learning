import {test, expect} from '@playwright/test';

test('Compare Snapshot of the page', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/');

    //Approach 1: Using toMatchSnapshot()

    //screenshot will be taken and compared with the existing one in the folder.
    // if the screenshot is not present, it will be created and saved in the folder.
    expect(await page.screenshot()).toMatchSnapshot('homepage.png'); 


    //Approach 2: Using toHaveScreenshot()
    await expect(page).toHaveScreenshot('homepage.png');
    
});


test.only('Compare Snapshot of the element', async ({page}) => {
    await page.goto('https://demowebshop.tricentis.com/');

    const logo = page.locator('img[alt="Tricentis Demo Web Shop"]');
    expect(await logo.screenshot()).toMatchSnapshot('logo.png');

});
