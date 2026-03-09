import {test,expect,Locator} from "@playwright/test";

test("Get all table data from all pages", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const table = page.locator("table#example tbody");

    let tableRows: string[] = [];
    let paginationButtondisplayed = true;

    while (paginationButtondisplayed) {
        const paginationButton = page.locator('button.next');
        const rows = await table.locator('tr').all();
        for (let row of rows) {
            tableRows.push(await row.innerText());
        }
        if (await paginationButton.isEnabled()) {
            await paginationButton.click();
        } else {
            paginationButtondisplayed = false;
        }
    }
    console.log("Total number of rows in the table: " + tableRows.length);
});

test("Filter the rows and check the number of rows displayed", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const table = page.locator("table#example tbody");

    const resultsDropdown = page.locator('select.dt-input');
    await resultsDropdown.selectOption('50');
    const rowsInPage = await table.locator('tr').all();
    console.log("Total number of rows in this page: " + rowsInPage.length);
    expect(rowsInPage.length).toBe(50);
});

test("Search for a record in the table", async ({ page }) => {
    await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
    const table = page.locator("table#example tbody");

    await page.getByLabel('Search:').fill("Gloria Little");
    const searchElements = await table.locator('tr').all();
    if (searchElements.length > 0) {
        for (let i of searchElements) {
            const rowText = await i.innerText();
            expect(rowText).toContain("Gloria Little");
        }
    } else {
        console.log("No records found with search criteria");
    }
});