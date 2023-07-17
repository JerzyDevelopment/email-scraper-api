"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var smsTemplate = function (e, url, url2) {
    if (e === 1) {
        return "We noticed you haven\u2019t completed your PPI Tax claim. Simply sign here to get the ball rolling on your rebate: ".concat(url, ". Opt out: ").concat(url2);
    }
    else if (e === 2) {
        return "Gentle Reminder:\n\n    You could be owed \u00A31000s back!  We can\u2019t start your claim until you\u2019ve signed here: ".concat(url, ". Opt out: ").concat(url2);
    }
    else if (e === 3) {
        return "Quick Nudge!\n\n    Take advantage and claim back what's rightfully yours. Complete your PPI Tax claim by signing here: ".concat(url, ". Opt out: ").concat(url2);
    }
    else if (e === 4) {
        return "QUICK!!\n\n    Your application to claim up to \u00A311,210 is expiring soon. Please sign here and complete your claim: ".concat(url, ". Opt out: ").concat(url2);
    }
    else if (e === 5) {
        return "LAST CHANCE!!\n\n    Submit your signature to claim as much as \u00A311,210. Sign here while you can: ".concat(url, ". Opt out: ").concat(url2);
    }
};
exports.default = smsTemplate;
