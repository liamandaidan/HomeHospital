import { chromium } from 'playwright';
import MedicalFacility from '../models/medicalFacility.Model.js'



export async function webscrape() {
    // Launch browser;
    const browser = await chromium.launch();

    // Create pages, interact with UI elements, assert values
    const page = await browser.newPage();
    await page.goto( 'https://www.albertahealthservices.ca/waittimes/waittimes.aspx' );
    
  // Store array of names and wait times of elements which are apart of a class.

  // just checking Calgary hospitals for now
  const hospitals = {
		name: await page
			.locator('.cityContent-calgary .hospitalName')
			.allInnerTexts(),
		time: await page
			.locator('.cityContent-calgary .wt-times')
			.allInnerTexts(),
  }

  const fullList = []

  for ( let i = 0; i < hospitals.name.length; i++ ) {
		fullList.push( { name: hospitals.name[i], waitTime: hospitals.time[i] } )
  }

  console.log(fullList)

  fullList.forEach( ( hospitalObj ) => {
    const filter = { hospitalName: hospitalObj.name }
    const update = { waitTime: hospitalObj.waitTime }
    const facility = MedicalFacility.findOneAndUpdate(filter, update).exec();
    console.log(filter.hospitalName);
    console.log(filter.waitTime);
  } )
  
  await browser.close();
};

//webscrape();
//setInterval(webscrape, 120000);
