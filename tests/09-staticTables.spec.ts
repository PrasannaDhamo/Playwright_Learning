import {test,expect,Locator} from "@playwright/test";

test("Static Web Tables", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    const table:Locator = page.locator("table[name='BookTable']>tbody");
    await expect(table).toBeVisible();
    const rows:Locator = table.locator('tr'); //table.locator for rows is a chain locator
    const rowscount = await rows.count();
    await expect(rows).toHaveCount(7);
    expect(rowscount).toBe(7);
    console.log(await rows.allTextContents());

    const headers:Locator = rows.locator('th');
    await expect(headers).toHaveCount(4);

    const cells:Locator = rows.locator('td');
    await expect(cells).toHaveCount(24);


    // Read all data from 3rd row
    const thirdrow = await rows.nth(2).locator('td').allInnerTexts();
    console.log("Data from 3rd row: ", thirdrow);

    expect(thirdrow).toContain("Mukesh");
    for(let i of thirdrow){
        console.log(i);
    }


    // Read all data from table excluding the header row

    const allTableData = await cells.allInnerTexts();

    console.log("All Table data:");
    for(let i of allTableData){
        console.log(i);
    }   

    //Method 2: Read data row-wise excluding header row
    const rowLocators:Locator[] = await rows.all();
    for(let j of rowLocators.slice(1)){ //slicing to skip header row
        const cols = await j.locator('td').allInnerTexts();
        console.log(cols);
    }

    //Method 3: Read data column-wise excluding header row

    let coun:any[] = [];
    for(let k of rowLocators){
        const colData = await k.locator('td').allInnerTexts();
        if(colData[1]==='Mukesh'){
            console.log(colData[0]);  //prints book name where author is Mukesh
            coun.push(colData[0]);
        }
    }
    let countval = coun.length;
    expect(countval).toBe(2); //verifying that there are 2 books by author Mukesh
    expect(coun).toHaveLength(2);


    //Calculate the total proce of all books
    let sum : number= 0;
    for(let k of rowLocators.slice(1)){ //skipping header row
        const colData = await k.locator('td').allInnerTexts();
        const price : number = parseInt(colData[3]); //converting string to number
        sum += price;
    }
    console.log('Total price:',sum);

    expect(sum).toBe(7100);
})