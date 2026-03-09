import {test, expect} from "@playwright/test";

test( 'Shadow DOM', async({page})=> {
  await page.goto('https://books-pwakit.appspot.com/');
  await page.locator('#input').fill('Playwright');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(5000);
})


test.only( 'Shadow DOM - 2', async({page})=> {
  await page.goto('https://shop.polymer-project.org/');
  await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click();
  await page.waitForTimeout(3000);
  const titles = await page.locator('div.title').all();
  console.log("Titles count: ", titles.length);
  for (const title of titles) {
    console.log("Title text: ", await title.textContent());
    if (await title.textContent() === "Fleece Full-Zip Hoodie") {
        expect(await title.textContent()).toBe("Fleece Full-Zip Hoodie");
        console.log("Test passed: Found the expected title.");
        break;
    }
  }
})