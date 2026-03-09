/*
-------------CSS Locators------------
Two types of CSS Locators:
1. Absolute Locators
2. Relative Locators

Syntax for CSS Locators:
1. #id - using id (also tag with ID)
2. .classname - using class name (also tag with class name)
3. tagname[attribute='value'] - using attribute and value (also without tagname)
4. tagname.classname[attribute='value'] - using tag name and class name and attribute (also without tagname)

Syntax for playwright to use CSS locators:
----page.locator()
*/

import {test, expect, Locator} from '@playwright/test';

test("Verify CSS Locators", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //tag#id
    const searchbox:Locator = page.locator("input#small-searchterms");
    await expect(searchbox).toBeVisible();

    //#id
    const searchbox2:Locator = page.locator("#small-searchterms");
    await expect(searchbox2).toBeVisible();

    //tag.classname
    const searchbox3:Locator = page.locator("input.search-box-text");
    await expect(searchbox3).toBeVisible();

    //.classname
    const searchbox4:Locator = page.locator(".search-box-text");
    await expect(searchbox4).toBeVisible();

    //tag[attribute='value']
    const searchbox5:Locator = page.locator("input[value='Search store']");
    await expect(searchbox5).toBeVisible();

    //[attribute='value']
    const searchbox6:Locator = page.locator("[value='Search store']");
    await expect(searchbox6).toBeVisible();

    //tag.classname[attribute='value']
    const searchbox7:Locator = page.locator("input.search-box-text[value='Search store']");
    await expect(searchbox7).toBeVisible();

    //.classname[attribute='value']
    const searchbox8:Locator = page.locator(".search-box-text[value='Search store']");
    await expect(searchbox8).toBeVisible();


    //Absolute CSS locator
    const searchbox9:Locator = page.locator("html>body>div>div>div>div>form>input.search-box-text[name=q]");
    await expect(searchbox9).toBeVisible();

    //Relative CSS locator
    const searchbox10:Locator = page.locator("form>input.search-box-text[id*=small]");
    await expect(searchbox10).toBeVisible();
});