import { chromium } from 'playwright';

async function webscrape() {
  // Launch browser;
  const browser = await chromium.launch();

  // Create pages, interact with UI elements, assert values
  const page = await browser.newPage();
  await page.goto('https://www.albertahealthservices.ca/waittimes/waittimes.aspx');


  // Store array of names and wait times of elements which are apart of a class.
  const Hospitals = {
    name: await page.locator('.hospitalName').allInnerTexts(),
    time: await page.locator('.wt-times').allInnerTexts()
  }
  
  console.log(Hospitals);

  await browser.close();
};

//setInterval(webscrape, 2000);