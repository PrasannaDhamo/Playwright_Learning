// Most of the time playwright will handle scrolling automatically. 
// But in some scenarios, you may need to scroll manually. 

import {test, expect} from "@playwright/test";

test( 'Scrolling to Footer', async({page})=> {
  await page.goto('https://demowebshop.tricentis.com/');
  const footerText = page.locator('div.footer-disclaimer');
  console.log(await footerText.innerText());
  await expect(footerText).toBeVisible();
})

test( 'Scrolling inside Dropdown', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/');
  page.locator('input#comboBox').click();
  const DropdownValue = page.locator('div#dropdown div:nth-child(100)');
  console.log(await DropdownValue.innerText());
  await expect(DropdownValue).toBeVisible();
  await DropdownValue.click();
})

test.only( 'Scrolling inside Tables', async({page})=> {
  await page.goto('https://datatables.net/examples/basic_init/scroll_xy.html');
  const tableCell = await page.locator('tbody tr:nth-child(10) td:nth-child(2)').innerText();
  console.log("Value of 10th row Name Value:", tableCell);

  const tableCellEmail = await page.locator('tbody tr:nth-child(10) td:nth-child(9)').innerText();
  console.log("Value of 10th row Email Value:", tableCellEmail);
})