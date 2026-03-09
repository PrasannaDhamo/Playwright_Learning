import {test,expect, Page, chromium} from "@playwright/test";

test('Handling Popups', async()=> {
    const browser = await chromium.launch(); //browser is the instance of chromium
    const context = await browser.newContext(); //context is created from browser instance
    const Parentpage = await context.newPage(); //page is created from context

    await Parentpage.goto("https://testautomationpractice.blogspot.com/");

    await Promise.all([Parentpage.waitForEvent('popup'), Parentpage.locator('#PopUp').click()]);

    const allPages = context.pages(); //Returns all pages in the context as an array
    console.log("Number of pages", allPages.length);

    console.log(allPages[0].url());
    console.log(allPages[1].url());

    for(let i of allPages){
        const title = await i.title();
        if(title.includes('Playwright')){
            i.locator('.getStarted_Sjon').click();
            const inText = i.locator('h1:has-text("Installation")');
            console.log(await inText.innerText());
            await expect(inText).toBeVisible();
            await i.close();
            break;
        }
    }
})