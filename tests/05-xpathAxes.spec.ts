/*
Xpath Axes - Defines the relationship between nodes, they allow navigation through the XML document in various directions.
   - self:: selects the context node itself
   - parent:: selects the parent of the context node
   - child:: selects children of the context node
   - ancestor:: selects all ancestors (parents, grandparents, etc.) of the context node
   - descendant:: selects all descendants (children, grandchildren, etc.) of the context node
   - following:: selects everything in the document after the context node
   - preceding:: selects everything in the document before the context node
   - following-sibling:: selects all siblings after the context node
   - preceding-sibling:: selects all siblings before the context node
*/

import{test, expect, Locator} from "@playwright/test";
test("Verify Xpath Axes", async ({page})=>{
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //1. self:: - Selects the context node itself
    const tableHeader:Locator = page.locator("//th[text()='Country']/self::th");
    await expect(tableHeader).toHaveText("Country");

    //2. parent:: - Selects the parent of the context node
    const parentOfGermany:Locator = page.locator("//td[text()='Germany']/parent::tr");
    await expect(parentOfGermany).toContainText("Maria Anders");
    await expect(parentOfGermany).toContainText("Alfreds Futterkiste");

    //3. child:: - Selects children of the context node
    const childrenOfFirstRow:Locator = page.locator("//table[@id='customers']//tr[2]/child::td");
    await expect(childrenOfFirstRow).toHaveCount(3); //3 columns in the first data row

    //4. ancestor:: - Selects all ancestors of the context node
    const ancestorOfGermany:Locator = page.locator("//td[text()='Germany']/ancestor::table");
    await expect(ancestorOfGermany).toHaveAttribute("id", "customers");

    //5. descendant:: - Selects all descendants of the context node
    const descendantsOfTable:Locator = page.locator("//table[@id='customers']/descendant::td");
    const descendantCount:number = await descendantsOfTable.count();
    console.log(`Total number of td descendants: ${descendantCount}`);
    expect(descendantCount).toBeGreaterThan(0);

    //6. following:: - Selects everything in the document after the context node
    const followingOfGermany:Locator = page.locator("//td[text()='Germany']/following::tr[1]/td[3]");
    await expect(followingOfGermany).toHaveText("Mexico");

    //7. following-sibling:: - Selects all siblings after the context node
    const followingSibling:Locator = page.locator("//td[text()='Alfreds Futterkiste']/following-sibling::td");
    await expect(followingSibling.nth(0)).toHaveText("Maria Anders");

    //8. preceding:: - Selects everything in the document before the context node
    const precedingOfMexico:Locator = page.locator("//td[text()='Mexico']/preceding::tr[1]/td");
    await expect(precedingOfMexico.nth(2)).toHaveText("Germany");

    //9. preceding-sibling:: - Selects all siblings before the context node
    const precedingSibling:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(precedingSibling.nth(0)).toHaveText("Alfreds Futterkiste");
    await expect(precedingSibling.nth(1)).toHaveText("Maria Anders");

})