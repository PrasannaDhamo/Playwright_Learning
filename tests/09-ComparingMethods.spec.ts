import {test,expect,Locator} from "@playwright/test";

test("Comparing Methods", async ({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
    const products:Locator = page.locator('.product-title');

    //1. innertext() vs textcontent()

    console.log(await products.nth(1).innerText());
    console.log(await products.nth(1).textContent());
    const count = await products.count();
    for(let i=0;i<count;i++){
        console.log(await products.nth(i).innerText()); //innertext returns only visible text, it also return only strings
        let textcont : string | null = await products.nth(i).textContent(); //textContent returns all text including hidden text, it also returns null if there is no text
        console.log(textcont?.trim()); 
    }


    //2. allInnerTexts() vs allTextContents()

    let allinnertextarray:string[] = await products.allInnerTexts();
    console.log("AllInnertext: ", allinnertextarray);
    let alltextcontentarray:string[] = await products.allTextContents();
    let trimmedtextconts = alltextcontentarray.map(i=>i.trim());
    console.log("AllTextContent: ", trimmedtextconts);


    //3. all() --> converts Locator of multiple elements to array of Locators
    
    let productLocators: Locator[] = await products.all(); // returns array of locators
    console.log(productLocators);
    console.log(await productLocators[1].innerText());
})