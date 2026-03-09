/*
------Xpath Locators----------
Two types of Xpath Locators:
1. Absolute Xpath - starts with single forward slash /
   Example: /html/body/div/div/div/div/form/input
2. Relative Xpath - starts with double forward slash //
   Example: //input[@id='small-searchterms']

   Syntax for Xpath Locators:
1. //tagname[@attribute='value'] - using attribute and value 
2. //tagname[contains(@attribute,'value')] - using contains function 
3. //tagname[text()='value'] - using text function
4. //tagname[contains(text(),'value')] - using contains with text function

Syntax for playwright to use Xpath locators:
----page.locator("xpath=your_xpath_expression")
*/


import {test,expect,Locator} from '@playwright/test';

test("Verify Xpath Selectors", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //1. Absolute Xpath
    const searchbutton:Locator = page.locator("xpath=/html/body/div[4]/div/div/div[3]/form/input[2]");
    await expect(searchbutton).toBeVisible();

    //2. Relative Xpath
    const searchbox1:Locator = page.locator("//input[contains(@class,'search-box-text') or @id='small-searchterms']");
    await expect(searchbox1).toBeVisible();

    //3. Using contains() function
    const products:Locator = page.locator("//h2/a[contains(@href, 'computer')]");
    const count:number = await products.count();
    console.log(`Number of products found: ${count}`);
    expect(count).toBeGreaterThan(0);
    // products.textContent(); //ERROR : Strict mode violation: locator resolved to more than one element

    console.log(await products.first().textContent()); //first product
    console.log(await products.nth(1).textContent()); //second product
    console.log(await products.last().textContent()); //last product

    for(let i=0; i<count; i++){
        console.log(await products.nth(i).textContent());
    }

    let allProducts = await products.allTextContents(); //array of all product names
    for(let j of allProducts){
        console.log(j); //print all product names
    }

    //4. Using starts-with() function
    const banner:Locator = page.locator("//h2/a[starts-with(@href, '/build')]");
    let bannerCount:number = await banner.count();
    console.log(`Number of Build href's found: ${bannerCount}`);
    expect(bannerCount).toBeGreaterThan(0);

    //5. Using text() function
    const welcomeText:Locator = page.locator("//p[text() = 'Welcome to the new Tricentis store!']");
    await expect(welcomeText).toBeVisible();
    await expect(page.getByText('Welcome to the new Tricentis store!')).toBeVisible();

    //6. Using Last() function
    const lastProduct:Locator = page.locator("(//h2/a[contains(@href, 'computer')])[last()]");
    console.log("Last Product: " + await lastProduct.textContent());
    const secondProduct:Locator = page.locator("(//h2/a[contains(@href, 'computer')])[2]"); //2nd product
    console.log("Second Product: " + await secondProduct.textContent());

    //7. Using Position() function
    const firstProduct:Locator = page.locator("(//h2/a[contains(@href, 'computer')])[position()=1]");
    console.log("First Product: " + await firstProduct.textContent());

})

test("Verify Dynamic Elements", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com");
    //using xpath locator to handle dynamic elements
    for(let i=0;i<5;i++){
        let startstopbutton = await page.locator("//button[text()='START' or text()='STOP']");
        await startstopbutton.click();
        await page.waitForTimeout(3000);
    }
    //using css locator to handle dynamic elements
    for(let i=0;i<5;i++){
        let startstopbutton_css = await page.locator('button[name="start"], button[name="stop"]');
        await startstopbutton_css.click();
        await page.waitForTimeout(3000);
    }
    //using Playwright built-in locator to handle dynamic elements
    for(let i=0;i<5;i++){
        let startstopbutton_playwright = await page.getByRole('button', { name: /START|STOP/ });
        await startstopbutton_playwright.click();
        await page.waitForTimeout(3000);
    }
})
