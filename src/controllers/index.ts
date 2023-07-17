import { Request, Response, NextFunction } from "express";


async function scrapeUrl(req: Request, res: Response, next: NextFunction) {
  try{

    console.log("Inside scrape url controller");
    

const url = req.params.url

console.log("URL to scrape: " + url);


    res.send({
      success: true,
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: err,
    });
  }
}


export default {
  scrapeUrl
};
