const puppeteer = require('puppeteer');

// const url = "https://ecs.co.uk"
// const url = "https://bbc.co.uk"
const url = "https://angular.realworld.io/"

async function getScreenshot() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });
  // await page.listeners(event) -might be useful for finding the listeners
  // await page.eventNames() -will that return the listeners?
  // await page.screenshot({path: 'example.png', fullPage: true});

  // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  // console.log(bodyHTML);

  // const listeners = page.eventNames();
  // console.log(listeners);

  await page.waitForSelector('a');

  const anchors = await page.evaluate(() => [...document.querySelectorAll('a')].map(elem => elem.innerText));
  console.log(anchors)

  console.log("Screenshot taken");
  await browser.close();
}

console.log("Starting screenshooter");
getScreenshot();

