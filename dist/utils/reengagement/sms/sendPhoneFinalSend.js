"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPhoneFinalSend = void 0;
var mailgun_1 = require("../../mailgun");
var api = require("../../../node_modules/clicksend/api.js");
var smsApi = new api.SMSApi(process.env.CLICK_SEND_USERNAME, process.env.CLICK_SEND_PASSWORD);
var sendPhoneFinalSend = function (smsCollection) {
    try {
        smsApi
            .smsSendPost(smsCollection)
            .then(function (response) {
            console.log(response.body);
        })
            .catch(function (err) {
            console.error(err.body);
            (0, mailgun_1.sendEmail)("aris@opopmedia.co.uk", "YPTR Send SMS error", null, "There was an error sending re-engagement sms for your ppi tax rebate", null, null);
        });
    }
    catch (err) {
        console.log("Error in sms send", err);
    }
};
exports.sendPhoneFinalSend = sendPhoneFinalSend;
