"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chromium = require("chrome-aws-lambda");
function extractEmails(text) {
    console.log(text, "TEXT");
    var emailRegEx = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
    return text.match(emailRegEx);
}
var getHtml = function (url) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, emails, _a, _b, page, data, error_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                console.log("1");
                browser = null;
                emails = [];
                _d.label = 1;
            case 1:
                _d.trys.push([1, 8, 9, 12]);
                _b = (_a = chromium.puppeteer).launch;
                _c = {
                    args: chromium.args,
                    defaultViewport: chromium.defaultViewport
                };
                return [4 /*yield*/, chromium.executablePath];
            case 2: return [4 /*yield*/, _b.apply(_a, [(_c.executablePath = _d.sent(),
                        _c.headless = chromium.headless,
                        _c)])];
            case 3:
                browser = _d.sent();
                console.log("2");
                return [4 /*yield*/, browser.newPage()];
            case 4:
                page = _d.sent();
                console.log("3");
                return [4 /*yield*/, page.goto(url, { timeout: 30000, waitUntil: "load" })];
            case 5:
                _d.sent();
                console.log("4");
                return [4 /*yield*/, page.setViewport({ width: 1080, height: 1024 })];
            case 6:
                _d.sent();
                console.log("5");
                return [4 /*yield*/, page.content()];
            case 7:
                data = _d.sent();
                console.log("6");
                // Extract all email addresses from the HTML content
                emails = extractEmails(data);
                emails = emails.filter(function (value, index, self) { return self.indexOf(value) === index; });
                console.log("7");
                return [3 /*break*/, 12];
            case 8:
                error_1 = _d.sent();
                console.error("Error in browser operation:", error_1);
                return [3 /*break*/, 12];
            case 9:
                if (!browser) return [3 /*break*/, 11];
                return [4 /*yield*/, browser.close()];
            case 10:
                _d.sent();
                _d.label = 11;
            case 11: return [7 /*endfinally*/];
            case 12: return [2 /*return*/, emails];
        }
    });
}); };
exports.default = getHtml;
