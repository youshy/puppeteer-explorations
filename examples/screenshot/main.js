const puppeteer = require('puppeteer');

const url = "https://ecs.co.uk"
// const url = "https://bbc.co.uk"

async function getScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });
  // await page.listeners(event) -might be useful for finding the listeners
  // await page.eventNames() -will that return the listeners?
  await page.screenshot({path: 'example.png', fullPage: true});

  console.log("Screenshot taken");
  await browser.close();
}

console.log("Starting screenshooter");
getScreenshot();

