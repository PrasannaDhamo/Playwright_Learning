import {test, chromium, expect} from "@playwright/test";

test( 'Browser Settings', async()=> {
    const browser = await chromium.launch({headless: false}); //launching browser in headed mode and slowing down actions by 1 second
    const context = await browser.newContext(
        {
            viewport: {width: 1280, height: 720}, //setting viewport size to 1280x720 pixels
            locale: 'en-US', //setting locale to English (United States)
          /*proxy: {
                server: 'http://myproxy.com:3128', //setting proxy server to http://myproxy.com:3128
                username: 'myusername', //setting proxy username to myusername
                password: 'mypassword' //setting proxy password to mypassword
            }*/
            ignoreHTTPSErrors: true //ignoring HTTPS errors
        }
    );
    const page = await context.newPage();
    await page.goto('https://www.badssl.com/');
    console.log('Page title: ', await page.title());
})