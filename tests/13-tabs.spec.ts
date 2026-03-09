import {test,expect, Page, chromium} from "@playwright/test";

test('Handling tabs', async()=> {
    const browser = await chromium.launch(); //browser is the instance of chromium
    const context = await browser.newContext(); //context is created from browser instance
    const Parentpage = await context.newPage(); //page is created from context

    await Parentpage.goto("https://testautomationpractice.blogspot.com/");
    
    const [Childpage] = await Promise.all([context.waitForEvent('page'), Parentpage.getByText('New Tab').click()]);
    
    //Approah :1
    const pages = context.pages();
    console.log("Number of pages", pages.length);

    console.log("Parent Page Title", await pages[0].title());
    console.log("Child Page Title", await pages[1].title());
    
    await Parentpage.waitForTimeout(3000);
    //Approah :2
    console.log("Parent Page Title", await Parentpage.title());
    console.log("Child Page Title", await Childpage.title());
    await Childpage.waitForTimeout(3000);
})