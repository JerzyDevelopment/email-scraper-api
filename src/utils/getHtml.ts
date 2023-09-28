import puppeteer from "puppeteer";

const chromium = require("chrome-aws-lambda");

function extractEmails(text: any) {
  console.log(text, "TEXT");
  var emailRegEx = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  return text.match(emailRegEx);
}

const getHtml = async (url: string) => {
  console.log("1");
  let browser = null;
  let emails = [];
  try {
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
    });

    console.log("2");

    const page = await browser.newPage();

    console.log("3");

    await page.goto(url, {timeout: 30000, waitUntil: "load"});
    console.log("4");

    await page.setViewport({width: 1080, height: 1024});

    console.log("5");

    let data = await page.content();

    console.log("6");

    // Extract all email addresses from the HTML content
    emails = extractEmails(data);
    emails = emails.filter(
      (value: any, index: any, self: any) => self.indexOf(value) === index
    );

    console.log("7");
  } catch (error) {
    console.error("Error in browser operation:", error);
  } finally {
    if (browser) await browser.close();
  }
  return emails;
};

export default getHtml;
