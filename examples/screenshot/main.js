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
  await page.screenshot({path: 'example.png', fullPage: true});

  // let bodyHTML = await page.evaluate(() => document.body.innerHTML);
  // console.log(bodyHTML);

  // const listeners = page.eventNames();
  // console.log(listeners);

  await page.waitForSelector('a');

  let num = 1

  await page.evaluate(async() => {
    let elements = document.getElementsByName("tag-list")
    let wiw = elements[elements.length - 1].children
    for (let el of wiw) {
      el.click()
      let name = "img"+num+".png"
      await page.screenshot({path: name, fullPage: true})
      await page.goto(url)
    }
  })
  console.log("Screenshot taken");
  await browser.close();
}

console.log("Starting screenshooter");
getScreenshot();

