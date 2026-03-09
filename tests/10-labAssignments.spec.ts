import {test,expect,Locator} from "@playwright/test";

test("Lab Assignment", async ({ page }) => {
    //Step 1: Launch the Website
    await page.goto("https://blazedemo.com/");

    //Step 2: Select Departure and Destination Cities
    const fromDropdown = page.locator("select[name='fromPort']");
    await fromDropdown.selectOption("Boston");
    const toDropdown = page.locator("select[name='toPort']");
    await toDropdown.selectOption("London");

    //Step 3: Search for Flights
    await page.locator('input.btn').click();

    //Step 4: Capture Flight Prices
    let flightPrices:number[] = [];
    const flightsTable = await page.locator("table.table tbody tr").all();
    console.log(flightsTable);
    for(let flight of flightsTable){
        let flightDetails = await flight.locator("td").allInnerTexts();
        console.log("Flight: ", flightDetails);
        const price = flightDetails[5];
        const priceValue = parseFloat(price.replace('$',''));
        flightPrices.push(priceValue);
    }
    console.log("Flight Prices: ", flightPrices);
    console.log("Flight Count: ", flightPrices.length);

    //Step 5: Identify the Lowest Price
    let lowestPrice:string = '$'+flightPrices[0].toString();//get the lowest price with dollar symbol
    console.log("Lowest Price: ", lowestPrice);

    //Step 6: Choose the Cheapest Flight
    for(let flight of flightsTable){
        let flightDetails = await flight.locator("td").allInnerTexts();
        if(flightDetails.includes(lowestPrice)){
            await flight.locator("input.btn-small").click();
            break;
        }else{
            console.log("Lowest price flight not found in row", flightDetails);
        }
    }

    //Step 7: Enter Passenger Information
    await page.locator('#inputName').fill("Prasanna Dhamodharan");
    await page.getByLabel("Address").fill("6, William Avenue");
    await page.getByLabel("City").fill("Coimbatore");
    await page.getByLabel("State").fill("Tamil Nadu");
    await page.getByLabel('Zip Code').fill("641018");
    await page.getByLabel("Credit Card Number").fill("6789 0673 4523 1267");
    await page.getByLabel("Name on Card").fill("Prasanna Dhamodharan");
    await page.getByRole("button").click();
    
    //Step 8: Confirm Purchase
    const confirmationText = await page.locator("div.hero-unit h1");
    if(await confirmationText.isVisible()){
        console.log("Success !! Passed");
    } else {
        console.log("Failed");
    }
})