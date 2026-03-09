import {test,expect,Locator, Page} from "@playwright/test";


async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page){

    let dateLocator = await page.locator('.ui-datepicker-calendar tbody td').all();

    let monthLocator = page.locator('select.ui-datepicker-month');
    let yearLocator = page.locator('select.ui-datepicker-year');

    monthLocator.selectOption(targetMonth);
    yearLocator.selectOption(targetYear);

    for(let dt of dateLocator){
        let dtText = await dt.innerText();
        if(dtText == targetDate){
            await dt.click();
            break;
        }
    }
}

test("Lab Assignment - DatePicker", async ({page})=>{

    //1. Setup
    await page.goto("https://www.dummyticket.com/dummy-ticket-for-visa-application/");

    //2. Select Ticket Type
    const Dummyticket:Locator = page.locator('#product_549');
    const DummyticketTextContent = await page.locator('.product-item').nth(0).innerText();
    await Dummyticket.check();
    const DummyticketText = DummyticketTextContent.split('—')[0].trim();
    const DummyticketPrice = DummyticketTextContent.split('—')[1].trim();
    console.log("Selected Ticket: ", DummyticketText);
    console.log("Ticket Price: ", DummyticketPrice);

    //3. Enter Passenger Details

    await page.locator("#travname").fill("Akash");
    await page.locator("#travlastname").fill("Ratore");
    
    const DOBDatePicker = page.locator('.thwcfe-checkout-date-picker').nth(0);
    await DOBDatePicker.click();
    
    //Select Target Date
    const Dobyear = '1996';
    const Dobmonth = 'Nov';
    const Dobdate = '14';

    await selectDate(Dobyear, Dobmonth, Dobdate, page);
    const expectedDOB = '14/11/1996';
    console.log("Selected DOB: ", await DOBDatePicker.inputValue());
    await expect(DOBDatePicker).toHaveValue(expectedDOB);
    const sexRadioButton:Locator = page.locator('#sex_1');
    await sexRadioButton.check();

    //4. Enter Travel Details
    const oneWayRadioButton = page.getByLabel('One Way');
    expect(oneWayRadioButton.isChecked()).toBeTruthy();
    await page.locator('#fromcity').fill('Toronto');
    await page.locator('#tocity').fill('Mumbai');

    const DepartureDatePicker = page.locator('.thwcfe-checkout-date-picker').nth(5);
    await DepartureDatePicker.click();

    //Select Target Date
    const Depyear = '2026';
    const Depmonth = 'Jan';
    const Depdate = '14';

    await selectDate(Depyear, Depmonth, Depdate, page);
    const expectedDep = '14/01/2026';
    console.log("Selected Departure Date: ", await DepartureDatePicker.inputValue());
    await expect(DepartureDatePicker).toHaveValue(expectedDep);

    //5. Additional Information
    await page.locator('#notes').fill('This is for Visa Application Purpose');

    //6. Delivery Options
    const AppointmentDatePicker = page.locator('.thwcfe-checkout-date-picker').nth(7);
    await AppointmentDatePicker.click();

    //Select Target Date
    const Appyear = '2026';
    const Appmonth = 'Jan';
    const Appdate = '10';

    await selectDate(Appyear, Appmonth, Appdate, page);
    const expectedApp = '10/01/2026';
    console.log("Selected Appointment Date: ", await AppointmentDatePicker.inputValue());
    await expect(AppointmentDatePicker).toHaveValue(expectedApp);

    await page.getByRole('radio', { name: 'Email' }).check();

    //7. Enter Billing Details
    await page.locator('#billname').fill('Akash Rathore');
    await page.locator('#billing_phone').fill('1234567890');
    await page.locator('#billing_email').fill('akash.rathore@example.com');
    await page.locator('#select2-billing_country-container').click();
    await page.locator('//li[text() = "Canada"]').click();
    await page.locator('#billing_address_1').fill('123 Main St');
    await page.locator('#billing_city').fill('Niagara Falls');
    await page.locator('#select2-billing_state-container').click();
    await page.locator('//li[text() = "Ontario"]').click();
    await page.locator('#billing_postcode').fill('L2C 6M1');

    //8. Verify Product details table
    const selectedProductDetail = await page.locator('div.product-details').innerText();
    const selectedProductDPrice = await page.locator('bdi').nth(7).innerText();

    expect(selectedProductDetail).toContain(DummyticketText);
    expect(selectedProductDPrice).toContain(DummyticketPrice);

    //9. Place order
    await page.getByText('Place order').click();
})