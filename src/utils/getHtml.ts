import puppeteer from "puppeteer";

function extractEmails(text: any) {
  console.log(text, "TEXT");
  var emailRegEx = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  return text.match(emailRegEx);
}

const getHtml = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--no-sandbox"],
  });
  const page = await browser.newPage();

  await page.goto(url, {timeout: 30000, waitUntil: "load"});

  await page.setViewport({width: 1080, height: 1024});

  let data = await page.content();

  console.log(data, "page data");

  // Extract all email addresses from the HTML content
  let emails = extractEmails(data);

  await browser.close();
  return emails.filter((value: any, index: number, self: any) => {
    return self.indexOf(value) === index;
  });
};

export default getHtml;
