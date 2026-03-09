import {test,expect,Locator, Page} from "@playwright/test";


async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page){
    //let dateLocator = page.locator('table.ui-datepicker-calendar a').filter({ hasText: targetDate }).first();
    let dater = await page.locator('table.ui-datepicker-calendar a').all();

    while (true) {
        let monthLocator = await page.locator('span.ui-datepicker-month').innerText();
        let yearLocator = await page.locator('span.ui-datepicker-year').innerText();

        if(monthLocator == targetMonth && yearLocator == targetYear){
            break;
        }

        await page.locator('span.ui-icon-circle-triangle-e').click();
        console.log("Current Month and Year: ", monthLocator, yearLocator);
    }

    //await dateLocator.click();

    for(let dt of dater){
        let dtText = await dt.innerText();
        console.log("Date: ", dtText);
        if(dtText == targetDate){
            await dt.click();
            break;
        }
    }
}

test("Lab Assignment", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datapicker = page.locator("#datepicker");
    await datapicker.click();

    //Select Target Date
    const year = '2026';
    const month = 'March';
    const date = '12';

    await selectDate(year, month, date, page);
    const expectedDate = '03/12/2026';
    await expect(datapicker).toHaveValue(expectedDate);
})

test.only("Lab Assignment 2", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const datapicker = page.locator("input#txtDate");
    await datapicker.click();

    //Select Target Date
    const year = '2026';
    const month = 'Apr';
    const date = '14';

    await page.locator('select.ui-datepicker-month').selectOption(month);
    await page.locator('select.ui-datepicker-year').selectOption(year);

    let dater = await page.locator('table.ui-datepicker-calendar a').all();

    //await dateLocator.click();

    for(let dt of dater){
        let dtText = await dt.innerText();
        console.log("Date: ", dtText);
        if(dtText == date){
            await dt.click();
            break;
        }
    }

    const expectedDate = '14/04/2026';
    await expect(datapicker).toHaveValue(expectedDate);
})

