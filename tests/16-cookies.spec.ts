import {test, chromium, expect} from "@playwright/test";

test( 'Cookies', async()=> {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    context.addCookies([
        {name: 'myCookie', value: 'myValue', url: 'https://testautomationpractice.blogspot.com/'}
    ]);
    await page.goto('https://testautomationpractice.blogspot.com/');
    console.log('Page title: ', await page.title());
    const addedCookies =  await context.cookies();

    //Get the cookie we added by name and verify its value
    const returnedCookie = addedCookies.find( i => i.name == "myCookie");
    console.log('Returned Cookie: ', returnedCookie);
    expect(returnedCookie?.value).toBe("myValue");
    expect(returnedCookie).toBeDefined();

    //clear cookies and verify
    await context.clearCookies();
    const clearedCookies = await context.cookies();
    expect(clearedCookies.length).toBe(0);
})