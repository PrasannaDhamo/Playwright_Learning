import {test,expect,Locator} from "@playwright/test";

test("Multi Select DropDown", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. Select Option from DropDown
    await page.locator('#colors').selectOption(['Red','Blue','Green']); //select by visible text
    await page.locator('#colors').selectOption(['red','blue','green']); //select by value attribute
    await page.locator('#colors').selectOption([{index:3},{index:4}]); //select by index (starts from 0)
    await page.locator('#colors').selectOption([{label:'Red'},{label:'Green'}]); //select by label

    //2. Check the number of options in the DropDown
    const dropdownCount = await page.locator('#colors>options').count();
    console.log(`Total number of options in the DropDown: ${dropdownCount}`);
    expect(dropdownCount).toBe(7);
    expect(dropdownCount).toBeGreaterThan(3);

    //3. Check an option available in the DropDown
    const dropdownOptions = (await page.locator('#colors>options').allTextContents()).map(i => i.trim());
    expect(dropdownOptions).toContain('Red');

    //4. Print all the options in the DropDown
    for (let i of dropdownOptions) {
        console.log(i);
    }

    //5. Selected Options count validation
    const selectedOptions:Locator = page.locator('#colors>option:checked');
    const selectedCount = await selectedOptions.count();
    console.log(`Total number of selected options: ${selectedCount}`);
    expect(selectedCount).toBe(4);

})