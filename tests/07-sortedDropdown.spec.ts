import {test,expect,Locator} from "@playwright/test";

test("Sorted Select DropDown", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    
    //1.Check whether the DropDown options are sorted or not
    
    const animalsdropdown = (await page.locator('#animals>option').allTextContents()).map(i => i.trim());
    console.log("Original DropDown list", animalsdropdown);
    //Sort is mutative method, it changes the original array
    const animalsSortedDropdownText = [...animalsdropdown].sort(); //Creating a copy of original array using spread operator before sorting
    console.log("Sorted DropDown list", animalsSortedDropdownText)

    expect(animalsdropdown).toEqual(animalsSortedDropdownText);

    console.log("------------------------------------********************----------------------------------------")
    //------------------------------------********************---------------------------------------------

    const colorsdropdown = (await page.locator('#colors>option').allTextContents()).map(i => i.trim());
    console.log("Original DropDown list", colorsdropdown);
    //Sort is mutative method, it changes the original array
    const colorsSortedDropdownText = [...colorsdropdown].sort(); //Creating a copy of original array using spread operator before sorting
    console.log("Sorted DropDown list", colorsSortedDropdownText)

    expect(colorsdropdown).toEqual(colorsSortedDropdownText);
})