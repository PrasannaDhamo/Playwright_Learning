import {test,expect,Locator} from "@playwright/test";

test("Single Select DropDown", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select Option from DropDown
    await page.locator('#country').selectOption('India'); //select by visible text
    await page.locator('#country').selectOption({value:'canada'}); //select by value attribute
    await page.locator('#country').selectOption({index:5}); //select by index (starts from 0)
    await page.locator('#country').selectOption({label:'Japan'}); //select by label

    //2. Check the number of options in the DropDown
    const Countryoptions:Locator = page.locator('#country>option');
    const optionCount:number = await Countryoptions.count();
    console.log(`Total number of options in the DropDown: ${optionCount}`);
    expect(optionCount).toBe(10);
    expect(optionCount).toBeGreaterThan(5);

    //3. Check an option available in the DropDown

    const dropDownText = (await Countryoptions.allTextContents()).map(i=>i.trim());
    expect(dropDownText).toContain('India');

    //4. Print all the options in the DropDown
    for(let i of dropDownText){
        console.log(i);
    }

    //5. Option is selected validation
    const selectedOption:Locator = page.locator('#country>option:checked');
    await expect(selectedOption).toHaveText('Japan');
})