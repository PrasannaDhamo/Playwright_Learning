import {test, expect} from "@playwright/test";

test( 'Mouse Hover', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const pointMeButton = page.locator('button.dropbtn');
  await pointMeButton.hover();
  await expect(page.locator('a:has-text("Mobiles")')).toBeVisible();
})

test( 'Right Click', async({page})=> {
  await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');
  const rightClickMeButton = page.locator('span.context-menu-one');
  await rightClickMeButton.click({button: 'right'});
  const menuitems = await page.locator('li.context-menu-item span').all();
  console.log(menuitems);
  for (const item of menuitems) {
    if (await item.textContent() === 'Edit') {
        page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
        });
      await item.click();
      break;
    }
  }
})


test.only( 'Double Click', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const doubleClickButton = page.locator("button[ondblclick='myFunction1()']");
  const field1Value = await page.locator('#field1').textContent();
  await doubleClickButton.dblclick();
  const field2Value = page.locator('#field2');
  expect(await field2Value.textContent()).toBe(field1Value);
  await expect(field2Value).toHaveValue('Hello World!');
})

test('Drag And Drop', async({page})=> {
  await page.goto('http://dhtmlgoodies.com/scripts/drag-drop-custom/demo-drag-drop-3.html');
  const rome = page.locator('#box106');
  const italy = page.locator('#box6');

  //Approach 1: Using mouse hover and drag manually ----- Not preferred
  await rome.hover();
  await page.mouse.down();
  await italy.hover();
  await page.mouse.up();

  //Approach 2: Using mouse hover and drag manually ----- Preferred
  await rome.dragTo(italy);
})