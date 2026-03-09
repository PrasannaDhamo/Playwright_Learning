import {test, expect, chromium} from "@playwright/test";
import { setTimeout } from "node:timers/promises";

test('Drag&Drop Lab', async()=> {
  const browser = await chromium.launch({headless: false}); //launching browser in headed mode and slowing down actions by 1 second
  //to set timeout for the entire test, we can use setTimeout method. It will apply to the entire test and if the test takes longer than the specified timeout, it will throw a timeout error. This is useful to ensure that our tests do not run indefinitely and helps in identifying performance issues or infinite loops in our test code.
  setTimeout(50000);
  const context = await browser.newContext();
  //to set timeout for all actions in the context, we can use setDefaultTimeout method. It will apply to all actions performed within that context, including page interactions, element locators, and other operations. If any action takes longer than the specified timeout, it will throw a timeout error.
  context.setDefaultTimeout(50000);
  const page = await context.newPage();
  await page.goto('http://demo.guru99.com/test/drag_drop.html');
  const bankButton = page.locator('//li/a[normalize-space()="BANK"]');
  const debitbankBox = page.locator('#bank');
  await bankButton.dragTo(debitbankBox);

  const bankAmount = page.locator('a').filter({ hasText: '5000' }).last();
  const debitbankAmount = page.locator('#amt7');
  await bankAmount.dragTo(debitbankAmount);

  const salesButton = page.locator('//li/a[normalize-space()="SALES"]');
  const creditloanBox = page.locator('#loan');
  await salesButton.dragTo(creditloanBox);

  const salesAmount = page.locator('a').filter({ hasText: '5000' }).last();
  const creditbankAmount = page.locator('#amt8');
  await salesAmount.dragTo(creditbankAmount);

  await expect(page.getByText('Perfect!')).toBeVisible();
})

test.only('Total Number of Books Lab', async({page})=> {
  await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');
  let previousHeight = 0;
  let ItemCount = 0;
  while(true)
  {
    //Scroll to the bottom of the page
    await page.evaluate(() =>{
      window.scrollTo(0, document.body.scrollHeight);
    })

    //Wait for 3 seconds to load new content
    await page.waitForTimeout(3000);

    //Capture the current scroll height of the page
    const currentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    })

    //Log the previous and current height
    console.log("Previous Height:", previousHeight);
    console.log("Scroll Height:", currentHeight);

    //Break the loop if no new content is loaded and set the item count
    if (currentHeight === previousHeight) {
        //Check the books present on the page
        const bookTitles = await page.locator('#productsDiv h3').allInnerTexts();//Locator for all book titles on the page
        ItemCount = bookTitles.length;
        break;
    }

    //Update the previous height for the next iteration
    previousHeight = currentHeight;
  }

  //If the book is not found after scrolling through all content, log a message
  console.log('Total Number of Books Available:', ItemCount);
})