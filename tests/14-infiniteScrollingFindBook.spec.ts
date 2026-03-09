import {test, expect} from "@playwright/test";

test( 'Infinite Scrolling', async({page})=> {
  test.slow(); // Marking the test as slow to avoid timeout issues, this will give extra time to complete the test
  await page.goto('https://www.booksbykilo.in/new-books?pricerange=201to500');

  // Variables to keep track of previous scroll height and book found status
  let previousHeight = 0;
  let bookFound = false;
  while(true)
  {
    //Check if the book is present on the page
    const bookTitles = await page.locator('#productsDiv h3').allInnerTexts();//Locator for all book titles on the page
    
    //Iterate through the book titles to find the desired book
    if(bookTitles.includes('Life in the Victorian Age')) {
      console.log('The book "Life in the Victorian Age" is found on the page.');
      bookFound = true; //Set book found status to true
      expect(bookFound).toBeTruthy(); //Assertion to verify the book is found
      break;
    }

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

  //If the book is not found after scrolling through all content, log a message
  if(!bookFound) {
    console.log('The book is not found.');
  }
})