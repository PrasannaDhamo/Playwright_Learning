/* Playwright Locators
1. Built-in locators - can be accessed using 'page' fixture, has auto wait and retry mechanism
2. CSS locators
3. Xpath locators

Locator - Identifies the element on the web page.
DOM - Document Object Model - structure of the web page in a tree format.
DOM is a API interface provided by the browser to interact with the web page.

--------------Built-in locators-----------
1. page.getByAltText() - for images using alt text attribute
2. page.getByText() - for text content
3. page.getByRole() - for ARIA roles (not the attribute role, here it refers to type of element like button, link, etc.)
4. page.getByLabel() - for form elements using label
5. page.getByPlaceholder() - for form elements using placeholder
6. page.getByTitle() - for elements using title attribute
7. page.getByTestId() - for elements using data-testid attribute, if its changed we can customize in the config file below trace add- 'testIdAttribute' property with the updated.
-------------------------------------------------*/

import {test, expect, Locator} from '@playwright/test'

test("Verify Playwright Locators", async({page})=>{
    await page.goto("https://demo.nopcommerce.com");
    //getByAlText - for images using alt text attribute
    const alttext:Locator = page.getByAltText("Picture of Apple MacBook Pro");
    await expect(alttext).toBeVisible();

    //getByText - for text content
    const text:Locator = page.getByText("Welcome to our store");
    await expect(text).toBeVisible();

    //getByRole - for roles like button, link, etc.
    const role:Locator = page.getByRole("link", {name: "Register"});
    await role.click();
    await expect(page.getByRole("heading", {name: "Register"})).toBeVisible();

    //getByPlaceholder - for form elements using placeholder
    const searchPlaceHolder:Locator = page.getByPlaceholder("Search store");
    await expect(searchPlaceHolder).toBeVisible();

    //getByLabel - for form elements using label
    const searchLabel:Locator = page.getByLabel("First name:");
    await searchLabel.fill('Prasanna');
    await page.getByLabel('Last name:').fill('Dhamodharan');
    await page.getByLabel('Email:').fill('prasanna.dhamodharan@example.com');
});



