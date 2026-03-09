//browser --> context --> page --> element --> actions
/*Context - we can have multiple contexts for a single browser instance, it provides an isolated environment for each pages.
    Context level - cookies, permissions, geolocation, etc.*/
/*Page - A single new tab or window or popup in the browser. Each page runs in its own context.*/


import {test,expect, chromium} from "@playwright/test";

test('Browser Context', async()=> {
    const browser = await chromium.launch(); //browser is the instance of chromium
    const context = await browser.newContext(); //context is created from browser instance
    
    const page = await context.newPage(); //page is created from context
    const page2 = await context.newPage(); //another page in the same context
    
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page2.goto("https://www.google.com/");

    console.log('Number of pages created: ', context.pages().length)

    //getting text from first page and using it in second page
    const text = await page.locator('h1.title').innerText();
    const inputbox = page2.getByTitle('Search');
    await inputbox.fill(text); //filling google search box with text from first page
    await expect(inputbox).toHaveValue(text);


})