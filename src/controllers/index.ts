import {Request, Response, NextFunction} from "express";
import generateCsv from "../utils/generateCsv";
import getHtml from "../utils/getHtml";
const cheerio = require("cheerio");
const https = require("https");

async function scrapeUrl(req: Request, res: Response, next: NextFunction) {
  try {
    console.log("Inside scrape url controller");

    const url = req.body?.url;

    console.log("URL to scrape: " + url);

    const data: any = await getHtml(url);

    generateCsv(data)
      .then((fileData) => {
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=emails.csv");

        res.send(fileData);
      })
      .catch((error) => {
        console.error("Error generating CSV file:", error);
        res.status(500).send("Failed to generate CSV file.");
      });
  } catch (err) {
    console.log("Error in func" + err);
    res.status(400).send({
      success: false,
      message: err,
    });
  }
}

export default {
  scrapeUrl,
};
