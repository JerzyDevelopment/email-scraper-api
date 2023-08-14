"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var createCsvWriter = require("csv-writer").createObjectCsvWriter;
var moment_1 = __importDefault(require("moment"));
var path = require("path");
var fs = require("fs");
var generateCsv = function (arr) {
    console.log(arr, "INSIDE GENERATE CSV");
    var date = (0, moment_1.default)().format().split("T")[0];
    var filePath = path.resolve(__dirname, "./generatedCsvs/emails-".concat(date, ".csv"));
    var csvWriter = createCsvWriter({
        path: filePath,
        header: [{ id: "email", title: "Email" }],
    });
    var records = arr.map(function (email) { return ({ email: email }); });
    return new Promise(function (resolve, reject) {
        csvWriter
            .writeRecords(records)
            .then(function () {
            console.log("CSV file \"".concat(filePath, "\" has been generated."));
            var fileData = fs.readFileSync(filePath);
            resolve(fileData);
        })
            .catch(function (error) {
            console.error("Error generating CSV file:", error);
            reject(error);
        });
    });
};
exports.default = generateCsv;
