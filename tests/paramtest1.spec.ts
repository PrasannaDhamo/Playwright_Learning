import { test, expect } from '@playwright/test'


const products = ['laptop', 'computer', 'phone', 'camera']

// using for_of loop
for(let product of products){
    test(`Param Test ${product}`, async ({page}) =>{
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(product);
        await page.locator('input[type="submit"]').click();
        await page.waitForTimeout(3000);
        await expect.soft(page.locator("h2 a").nth(0)).toContainText(product ,{ignoreCase:true});
    })
}

// using for_each loop
products.forEach((product) =>{
    test(`Param Test For Each ${product}`, async ({page}) =>{
        await page.goto('https://demowebshop.tricentis.com/');
        await page.locator('#small-searchterms').fill(product);
        await page.locator('input[type="submit"]').click();
        await page.waitForTimeout(3000);
        await expect.soft(page.locator("h2 a").nth(0)).toContainText(product ,{ignoreCase:true});
    })
})