import {test,expect,Locator} from "@playwright/test";

test("Multi Select DropDown", async ({page})=>{
    await page.goto("https://www.booking.com/");
    await page.waitForTimeout(3000);
    await page.getByTestId('searchbox-dates-container').click();

    //Check-in date
    const checkInYear = "2026";
    const checkInMonth = "March";
    const checkInDay = "15";


    while(true){
        const checkInMonthYear = await page.locator('h3[aria-live="polite"]').nth(0).innerText();
        let currentMonth = checkInMonthYear.split(" ")[0];
        let currentYear = checkInMonthYear.split(" ")[1];
        if(currentMonth === checkInMonth && currentYear === checkInYear){
            break;
        }else{
            await page.locator("//button[@aria-label='Next month']").click();
        }
    }

    const tablelocatorcheckIn = await page.locator('table[role="grid"]').nth(0).locator('td>span>span').all();
    for(let i of tablelocatorcheckIn){
        const day = await i.innerText();
        if(day === checkInDay){
            await i.click();
            break;
        }
    }
    //Check-out date
    const checkOutYear = "2026";
    const checkOutMonth = "April";
    const checkOutDay = "10";

    while(true){
        const checkOutMonthYear = await page.locator('h3[aria-live="polite"]').nth(0).innerText();
        let currentMonth = checkOutMonthYear.split(" ")[0];
        let currentYear = checkOutMonthYear.split(" ")[1];
        if(currentMonth === checkOutMonth && currentYear === checkOutYear){
            break;
        }
        else{
            await page.locator("//button[@aria-label='Next month']").click();
        }
    }

    const tablelocatorcheckOut = await page.locator('table[role="grid"]').nth(0).locator('td>span>span').all();
    for(let i of tablelocatorcheckOut){
        const day = await i.innerText();
        if(day === checkOutDay){
            await i.click();
            break;
        }
    }

    console.log(await page.getByTestId('date-display-field-start').innerText());
    console.log(await page.getByTestId('date-display-field-end').innerText());
})