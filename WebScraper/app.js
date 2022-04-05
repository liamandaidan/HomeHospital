
import dotEnv from 'dotEnv'
import { webScraper } from './webScraper.js'
import DBConnect from './db.js'
dotEnv.config()


// connect to DB
try {
    console.log('Web Scraper is starting up!')
    await DBConnect()
} catch (error) {
    console.log(error.message)
}
// cycle web scraper
try {
    // Scrape the web every 2 minutes
	 setInterval(webScraper, 120000)
} catch (error) {
    console.log(error.message)
}
