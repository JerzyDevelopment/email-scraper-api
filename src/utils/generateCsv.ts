const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import moment from "moment";
const path = require("path");
const fs = require("fs");

const generateCsv = (arr: string[]): Promise<Buffer> => {
  console.log(arr, "INSIDE GENERATE CSV");

  const date = moment().format().split("T")[0];

  const filePath = path.resolve(
    __dirname,
    `./generatedCsvs/emails-${date}.csv`
  );

  const csvWriter = createCsvWriter({
    path: filePath,
    header: [{id: "email", title: "Email"}],
  });

  const records = arr.map((email) => ({email}));

  return new Promise((resolve, reject) => {
    csvWriter
      .writeRecords(records)
      .then(() => {
        console.log(`CSV file "${filePath}" has been generated.`);
        const fileData = fs.readFileSync(filePath);
        resolve(fileData);
      })
      .catch((error: any) => {
        console.error("Error generating CSV file:", error);
        reject(error);
      });
  });
};

export default generateCsv;
