import {test, expect} from '@playwright/test';

/*syntax
test("title", ({page})=>{
    //steps
}); */

test('Verify Page Heading', async ({page}) => {
    await page.goto('https://www.automationpractice.pl/index.php');
    let title:string = await page.title();
    console.log(title);
    await expect(page).toHaveTitle("My Shop");
});
