import {test, expect} from "@playwright/test";

test( 'Infinite Scrolling', async({page})=> {
  test.slow(); // Marking the test as slow to avoid timeout issues, this will give extra time to complete the test
  await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

  let previousHeight = 0;
  while(true)
  {
    //Scroll to the bottom of the page
    await page.evaluate(() =>{
      window.scrollTo(0, document.body.scrollHeight);
    })

    //Wait for 3 seconds to load new content
    await page.waitForTimeout(3000);

    //Capture the current scroll height of the page
    const currentHeight = await page.evaluate(() => {
      return document.body.scrollHeight;
    })

    //Log the previous and current height
    console.log("Previous Height:", previousHeight);
    console.log("Scroll Height:", currentHeight);

    //Break the loop if no new content is loaded
    if (currentHeight === previousHeight) {
      break;
    }

    //Update the previous height for the next iteration
    previousHeight = currentHeight;
  }
})
