import { test, expect, devices} from '@playwright/test';

// For auto code generation, we can use the codegen command in terminal as below:
// npx playwright codegen
// to copy the generated code to file, we can use the below command: 
// npx playwright codegen -o tests/codegentest.spec.ts
// npx playwright codegen --output tests/codegentest.spec.ts


// To use a mobile device, we can use the below command:
// npx playwright codegen --device, will list all the available devices, we can select the device and generate the code for that device.
// npx playwright codegen --device="iPhone 12" -o tests/codegentest.spec.ts


test.use({
  ...devices['iPhone 15'],
});

test('test1', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');
  await expect(page.getByRole('link', { name: 'PRODUCT STORE' })).toBeVisible();
  await expect(page.locator('#nava')).toMatchAriaSnapshot(`
    - link "PRODUCT STORE":
      - /url: index.html
      - img
    `);
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
});