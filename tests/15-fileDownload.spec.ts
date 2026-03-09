import {test, expect} from "@playwright/test";
import fs from 'fs'; //Importing the Node.js 'fs' module to handle file system operations, such as checking if a file exists or reading its contents


test( 'Download Txt File', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
  
  await page.locator('#inputText').fill('Test Download'); //Filling the input field with text to be included in the generated file
  await page.locator('#generateTxt').click(); //Clicking the button to generate the file

// Using Promise.all to wait for the download event to be triggered by the click action, ensuring that we capture the download object before it starts downloading
  const [download] = await Promise.all([            //[download] is used to capture the download event and store the download object for later use, its in [] because page.waitForEvent returns an array of events, and we are only interested in the first one (the download event triggered by the click)
    page.waitForEvent('download'),
    page.locator('#txtDownloadLink').click()
  ]);

//Save the downloaded file to a specific path
  const downloadPath = 'downloads/testDownload.txt';
  await download.saveAs(downloadPath);

//Check if file exists at the specified path
  const fileExists = fs.existsSync(downloadPath); //returns true if the file exists at the specified path, and false otherwise.
  expect(fileExists).toBeTruthy();


//clean up - delete the downloaded file after the test
  if(fileExists){
    fs.unlinkSync(downloadPath); //Deletes the file at the specified path, ensuring that the test environment remains clean and does not accumulate downloaded files over time.
  }
})


test.only( 'Download PDF File', async({page})=> {
  await page.goto('https://testautomationpractice.blogspot.com/p/download-files_25.html');
  
  await page.locator('#inputText').fill('Test Download'); //Filling the input field with text to be included in the generated file
  await page.locator('#generatePdf').click(); //Clicking the button to generate the file

// Using Promise.all to wait for the download event to be triggered by the click action, ensuring that we capture the download object before it starts downloading
  const [download] = await Promise.all([            //[download] is used to capture the download event and store the download object for later use, its in [] because page.waitForEvent returns an array of events, and we are only interested in the first one (the download event triggered by the click)
    page.waitForEvent('download'),
    page.locator('#pdfDownloadLink').click()
  ]);

//Save the downloaded file to a specific path
  const downloadPath = 'downloads/testDownload.pdf';
  await download.saveAs(downloadPath);

//Check if file exists at the specified path
  const fileExists = fs.existsSync(downloadPath); //returns true if the file exists at the specified path, and false otherwise.
  expect(fileExists).toBeTruthy();


//clean up - delete the downloaded file after the test
  if(fileExists){
    fs.unlinkSync(downloadPath); //Deletes the file at the specified path, ensuring that the test environment remains clean and does not accumulate downloaded files over time.
  }
})