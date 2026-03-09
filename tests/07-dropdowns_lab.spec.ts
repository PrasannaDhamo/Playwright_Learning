import { test, expect,Locator } from '@playwright/test';

test('Product sort and print lowest/highest price with names', async ({ page }) => {
  // Navigate to the URL
  await page.goto('https://www.bstackdemo.com/');

  // Locate the "Order by" dropdown using CSS selector and select "Lowest to highest"
  const orderByDropdown = page.locator('div.sort>select');
  await expect(orderByDropdown).toBeVisible(); // Assert dropdown is visible
  await expect(orderByDropdown).toBeEnabled(); // Assert dropdown is enabled

  await orderByDropdown.selectOption('Lowest to highest');

   // Wait for sorting to reflect
  await page.waitForTimeout(3000);

  // Get all product price and name elements using CSS
  const productNames = await page.locator('p.shelf-item__title').allTextContents();
  const productPrices = await page.locator('div.val>b').allTextContents();

    const productNameCount = productNames.length;
    const productPriceCount = productPrices.length;
    expect(productNameCount).toBe(productPriceCount); // Assert that prices and names count are equal

  console.log('Printing Product Names along with their Prices.......');
  for (let i = 0; i < productNameCount; i++) {
    console.log(`Products: name: ${productNames[i]}, price: ${productPrices[i]}`);
  }

  console.log(`Lowest Priced Product: ${productNames[0]} : ${productPrices[0]}`);
  console.log(`Highest Priced Product: ${productNames[productNameCount - 1]} : ${productPrices[productPriceCount - 1]}`);
});
