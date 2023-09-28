import generateCsv from "./utils/generateCsv";
import getHtml from "./utils/getHtml";
const fs = require("fs");

function listDirectoryContents(path: any) {
  try {
    return fs.readdirSync(path);
  } catch (error: any) {
    return `Error reading directory ${path}: ${error.message}`;
  }
}

module.exports.handler = async (event: any, context: any, callback: any) => {
  try {
    console.log("Inside scrape url controller");

    console.log("Contents of /opt:", listDirectoryContents("/opt"));
    console.log(
      "Contents of /opt/nodejs/node_modules:",
      listDirectoryContents("/opt/nodejs/node_modules")
    );

    const url = event?.url;

    console.log("URL to scrape: " + url);

    const data: any = await getHtml(url);

    return generateCsv(data)
      .then((fileData) => {
        // res.setHeader("Content-Type", "text/csv");
        // res.setHeader("Content-Disposition", "attachment; filename=emails.csv");

        // res.send(fileData);

        const response = {
          statusCode: 200,
          body: JSON.stringify({msg: "Hello from lambda"}),
          headers: {
            "Content-Type": "application/json",
          },
        };
        return response;
      })
      .catch((error) => {
        console.error("Error generating CSV file:", error);
        // res.status(500).send("Failed to generate CSV file.");
      });
  } catch (err) {
    console.log("Error in func" + err);
  }
};
