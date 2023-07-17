"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var reengageEmailTemplate = function (step) {
    var emailTemp;
    //Change this switch case to have the templates you need, add the html template and add however many versions you need, I have done 2 as an example
    switch (step) {
        case 1:
            emailTemp = "Email temp 1";
            break;
        case 2:
            emailTemp = "Email temp 2";
            break;
    }
    return emailTemp;
};
exports.default = reengageEmailTemplate;
