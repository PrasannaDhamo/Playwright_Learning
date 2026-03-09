import {test,expect, Locator} from "@playwright/test";


//Input Box, TextBox, Text Input Actions 
test("Verify Playwright TextBox/ Input Box Actions", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const nametextbox:Locator = page.locator('#name');
    await expect(nametextbox).toBeVisible();
    await expect(nametextbox).toBeEnabled();
    const maxLength = await nametextbox.getAttribute('maxlength');
    expect(maxLength).toBe('15');
    await expect(nametextbox).toHaveAttribute('maxlength', '15');
    await nametextbox.fill("Prasanna");
    console.log("Name entered in the textbox", await nametextbox.inputValue()); //Returns the value of the input field
    
    await page.waitForTimeout(5000);
})

//Radio Button Actions
test("Verify Playwright Radio Button Actions", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const maleRadio:Locator = page.locator('#male');
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();
    expect(await maleRadio.isChecked()).toBe(false);
    await maleRadio.check();
    expect(await maleRadio.isChecked()).toBe(true);
    await expect(maleRadio).toBeChecked();

    await page.waitForTimeout(3000);
})


//Checkboxes Actions
test.only("Verify Playwright Checkboxes Actions", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const SundayCheckbox =  page.getByLabel('Sunday');
    await SundayCheckbox.check();
    expect(await SundayCheckbox.isChecked()).toBe(true);
    await expect(SundayCheckbox).toBeChecked();


    const days:string[] = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const checkboxes: Locator[] = days.map(index => page.getByLabel(index));
    expect(checkboxes.length).toBe(7);
    for(let i of checkboxes){
        await i.check();
        await expect(i).toBeChecked();
        await page.waitForTimeout(1000);
    }

    const slicedcheckboxes: Locator[] = checkboxes.slice(-3);
    for(let i of slicedcheckboxes){
        await i.uncheck();
        await expect(i).not.toBeChecked();
        await page.waitForTimeout(1000);
    }

    for(let i of checkboxes){
        if(await i.isChecked()==true){
            await i.uncheck();
            await expect(i).not.toBeChecked();
            await page.waitForTimeout(1000);
        }
        else{
            await i.check();
            await expect(i).toBeChecked();
            await page.waitForTimeout(1000);
        }
    }

    
})