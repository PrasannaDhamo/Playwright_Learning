import { test, expect } from "@playwright/test";

test("Duplicate DropDown Elements", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const coloursDropDown = (await (page.locator('#colors>option').allTextContents())).map(i=>i.trim());
    // 'Red',   'Blue','Green', 'Yellow','Red',   'White', 'Green'
    const original = new Set<string>();
    const duplicates:string[] = [];
    for(let text of coloursDropDown){
        if(original.has(text)){  //has() is a Set method to check whether the value is already present in the Set
            duplicates.push(text); //push() is an Array method to add value to the Array
        }else{
            original.add(text); //add() is a Set method to add value to the Set
        }
    }
    console.log("Original DropDown List", original);
    console.log("Duplicate Options in the DropDown are: ", duplicates);

    expect(duplicates.length).toBeGreaterThan(0);
})