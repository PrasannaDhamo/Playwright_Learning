import {test,expect,Locator} from "@playwright/test";

test("Auto Suggest DropDown", async ({page})=>{
    await page.goto("https://www.flipkart.com/");
    page.locator('input[name="q"]').fill('smart');

    await page.waitForTimeout(2000); //Wait for suggestions to load, autowait doesn't work here

    // Inspector -> Source -> Pause script execution
    // Inspector -> Ctrl+shift+P -> Emulate a focused page
    const suggestions = page.locator('//ul//div[2]');
    console.log("Printing all suggestions:");
    for(let i=0;i<await suggestions.count();i++){
        const innertext = await suggestions.nth(i).innerText(); // Get the inner text of the suggestion
        console.log(innertext);
        if(innertext.includes('tv')){ // Check if suggestion includes 'tv'
            await suggestions.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle(/Tv/); // Verify that title contains 'Tv'


    await page.locator('input[name="q"]').fill('watch');
    await page.waitForTimeout(3000);
    const suggest = await page.locator('//ul//div[2]').allTextContents();
    console.log("Printing all suggestions:");
    for(let i of suggest){
        console.log(i);
    }
    expect(suggest).toContain("watch for boys"); // Verify that 'watch for boys' is one of the suggestions
})