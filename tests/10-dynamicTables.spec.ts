import {test,expect,Locator} from "@playwright/test";

test("Dynamic Web Tables", async ({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    await page.waitForTimeout(3000);
    const table:Locator = page.locator('table.table-striped tbody');
    await expect(table).toBeVisible();

    //Step:1
    const tableheader = (await page.locator('table.table-striped thead').allInnerTexts())[0].split('\t');
    console.log("Table Headers :",tableheader);
    let CpuColumnIndex:number = tableheader.indexOf('CPU');
    console.log("CPU Column :",CpuColumnIndex);

    //Step:2
    const tablearray = await table.locator('tr').allInnerTexts();
    console.log("Table Rows:",tablearray);
    let chromeCpuValue: string = "";
    for(let i of tablearray){
        if(i.includes("Chrome")){
            const chromerow = i.split('\t');  //Splitting the chrome row data based on tab space
            console.log("Chrome Row:",chromerow);
            chromeCpuValue = chromerow[CpuColumnIndex];
        }
    }
    console.log(`The CPU value for Chrome is: ${chromeCpuValue}`);

    //Step:3
    const assertionValue = await page.locator("#chrome-cpu").innerText();
    console.log("Assertion Value:", assertionValue);
    expect(assertionValue).toContain(chromeCpuValue);
})


test("Verify Chrome CPU Value", async ({page})=>{
    await page.goto("https://practice.expandtesting.com/dynamic-table");
    await page.waitForTimeout(3000);
    const table:Locator = page.locator('table.table-striped tbody');
    await expect(table).toBeVisible();
    const tableRows:Locator[] = await table.locator('tr').all();

    //Step:1 - Get Chrome CPU value from the table
    let ChromeCPU: string = "";

    for(let row of tableRows){
        const Firstcell = await row.locator("td").nth(0).innerText();
        if(Firstcell.includes("Chrome")){
            //const ChromeCPU = row.locator("td").filter({hasText: '%'});
            ChromeCPU = await row.locator("td", {hasText: '%'}).innerText();
            //ChromeCPU = await row.locator("td:has-text('%')").innerText();
            console.log("Chrome CPU:", ChromeCPU);
            break;
        }
    }

    //Step:2 - Assertion
    const assertionValue = await page.locator("#chrome-cpu").innerText();
    expect(assertionValue).toContain(ChromeCPU)
})


test.only("Verify Firefox Memory Size", async ({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");
    await page.waitForTimeout(3000);
    const table:Locator = page.locator('table#taskTable tbody');
    await expect(table).toBeVisible();
    const tableRows:Locator[] = await table.locator('tr').all();

    //Step:1 - Get Firefox Memory value from the table
    let FirefoxMemory: string = "";
    let FirefoxDiskSpace: string = "";

    for(let row of tableRows){
        const Firstcell = await row.locator("td").nth(0).innerText();
        if(Firstcell.includes("Firefox")){
            // Get all cell values in the row
            const Firefoxcells = await row.locator("td").allInnerTexts();
            console.log("Firefox cells:", Firefoxcells);
            // Find the first cell value that ends with "MB"
            FirefoxMemory = Firefoxcells.find(cell => cell.endsWith("MB")) || ""; // find() returns the value of the first matching element
            console.log("Firefox Memory:", FirefoxMemory);
            FirefoxDiskSpace = Firefoxcells.find(cell => cell.endsWith("MB/s")) || ""; // find() returns the value of the first matching element
            console.log("Firefox Disk Space:", FirefoxDiskSpace);
        }
    }

    //Step:2 - Assertion
    const assertionValue = await page.locator("p>strong.firefox-memory").innerText();
    expect(assertionValue).toContain(FirefoxMemory)
    const assertionValue2 = await page.locator("p>strong.firefox-disk").innerText();
    expect(assertionValue2).toContain(FirefoxDiskSpace)
})