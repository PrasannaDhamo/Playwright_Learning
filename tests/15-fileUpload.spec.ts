import {test, expect} from "@playwright/test";

test( 'Single File Upload', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/');
  
  await page.locator('#singleFileInput').setInputFiles('uploads/testUpload1.txt');
  await page.locator('button:has-text("Upload Single File")').click();

  const statusText = await page.locator('#singleFileStatus').textContent();
  expect(statusText).toContain('testUpload1.txt');

  await page.waitForTimeout(5000);
})


test.only( 'Multiple Files Upload', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/');

  const fileInput = page.locator('#multipleFilesInput');
  await fileInput.setInputFiles(['uploads/testUpload1.txt', 'uploads/testUpload2.txt']); //Uploading multiple files using an array of file paths
  await page.locator('button:has-text("Upload Multiple Files")').click();

  const statusText = await page.locator('#multipleFilesStatus').textContent();
  expect(statusText).toContain('testUpload1.txt');
  expect(statusText).toContain('testUpload2.txt');

  await page.waitForTimeout(5000);
})