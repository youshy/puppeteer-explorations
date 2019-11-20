const puppeteer = require('puppeteer');

function sniffDetector() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  window.navigator.__defineGetter__('userAgent', function() {
    window.navigator.sniffed = true;
    return userAgent;
  });

  window.navigator.__defineGetter__('platform', function() {
    window.navigator.sniffed = true;
    return platform;
  });
}

const url = "https://ecs.co.uk"

async function sniffer() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.evaluateOnNewDocument(sniffDetector);
  await page.goto(url, {waitUntil: 'networkidle2'});
  console.log("Sniffed: " + (await page.evaluate(() => !!navigator.sniffed)));

  await browser.close();
}
console.log("Started sniffer")
sniffer()
