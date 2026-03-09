import {test,expect,Locator} from "@playwright/test";

test("Simple Dialog", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    //page.on() should be before the action that triggers the dialog
    page.on('dialog', async dialog => { //page.on() takes 2 parameters event name and arrow function
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe('I am an alert box!');
        console.log('Dialog type:', dialog.type());
        expect(dialog.type()).toBe('alert');
        await dialog.accept();
    });

    await page.locator('button#alertBtn').click();
});


test("Confirmation Dialog", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    //page.on() should be before the action that triggers the dialog
    page.on('dialog', async dialog => { //page.on() takes 2 parameters event name and arrow function
        console.log(`Dialog message: ${dialog.message()}`);
        expect(dialog.message()).toBe('Press a button!');
        console.log('Dialog type:', dialog.type());
        expect(dialog.type()).toBe('confirm');
        await dialog.dismiss();
        console.log('Dialog dismissed');
    });

    await page.locator('button#confirmBtn').click();
    console.log(await page.locator('#demo').innerText());
    await expect(page.locator('#demo')).toHaveText('You pressed Cancel!');
});

test.only("Prompt Dialog", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    //page.on() should be before the action that triggers the dialog
    page.on('dialog', async dialog => { //page.on() takes 2 parameters event name and arrow function
        console.log('Dialog type:', dialog.type());
        expect(dialog.type()).toBe('prompt');

        console.log('Dialog value:', dialog.defaultValue());
        await dialog.accept('Prasanna');
        console.log('Dialog accepted');
    });

    await page.locator('button#promptBtn').click();
    console.log(await page.locator('#demo').innerText());
    await expect(page.locator('#demo')).toHaveText('Hello Prasanna! How are you today?');
});