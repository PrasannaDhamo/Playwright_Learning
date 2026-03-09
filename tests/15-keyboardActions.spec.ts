/* Keyboard Actions
Playwright provides several methods to simulate keyboard actions, including:
    --- insertText() - Inserts text into an element.
    --- down() - Presses a key.
    --- press() - Presses and releases a key.
    --- type() - Types text into an element, with an optional delay between key presses.
    --- up() - Releases a key.

Syntax:
    await page.keyboard.insertText(text);
    await page.keyboard.down(key);
    await page.keyboard.press(key);
    await page.keyboard.type(text, options);
    await page.keyboard.up(key);
*/

import {test, expect} from "@playwright/test";

test( 'KeyBoard Actions', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const input1 = page.locator('#input1');

  //1.Focus on input1
  await input1.focus(); //await input1.click(); //Alternative way to focus on the input field

  //2.Provide the text to input1
  await page.keyboard.insertText('Hello World');

  //3.Select the text using Ctrl + A
  await page.keyboard.down('Control');
  await page.keyboard.press('A');
  await page.keyboard.up('Control');

  //4.Copy the text using Ctrl + C
  await page.keyboard.down('Control');
  await page.keyboard.press('C');
  await page.keyboard.up('Control');

  //5.Press TAB 2 times to move the focus to input2
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  //6.Paste the text using Ctrl + V
  await page.keyboard.down('Control');
  await page.keyboard.press('V');
  await page.keyboard.up('Control');

  //7.Press TAB 2 times to move the focus to input3
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  //8.Paste the text using Ctrl + V
  await page.keyboard.down('Control');
  await page.keyboard.press('V');
  await page.keyboard.up('Control');

  await page.waitForTimeout(5000);
})

test.only( 'KeyBoard Actions - Simple way', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/');
  const input1 = page.locator('#input1');

  //1.Focus on input1
  await input1.focus(); //await input1.click(); //Alternative way to focus on the input field

  //2.Provide the text to input1
  await page.keyboard.insertText('Hello World');

  //3.Select the text using Ctrl + A
  await page.keyboard.press('Control+A');

  //4.Copy the text using Ctrl + C
  await page.keyboard.press('Control+C');

  //5.Press TAB 2 times to move the focus to input2
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  //6.Paste the text using Ctrl + V
  await page.keyboard.press('Control+V');

  //7.Press TAB 2 times to move the focus to input3
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  //8.Paste the text using Ctrl + V
  await page.keyboard.press('Control+V');

  await page.waitForTimeout(5000);
})