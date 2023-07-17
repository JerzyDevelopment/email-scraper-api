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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.phoneV1 = void 0;
var sequelize_1 = require("sequelize");
var shortenUrl_1 = __importDefault(require("../../shortenUrl"));
var reengageSmsTemplate_1 = __importDefault(require("../reengageSmsTemplate"));
var _a = require("../../../models"), Lead = _a.Lead, SMS = _a.SMS;
var phoneV1 = function (_a) {
    var leadsIdsCheck = _a.leadsIdsCheck, greaterTime = _a.greaterTime, checkTime = _a.checkTime, stepPhone = _a.stepPhone;
    return __awaiter(void 0, void 0, void 0, function () {
        var allLeads, leadsArr_1, initialAdds, msgData, i, data, url, optOutLink, smsMessage, err_1;
        var _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    _j.trys.push([0, 10, , 11]);
                    return [4 /*yield*/, Lead.findAll({
                            where: {
                                stage: (_b = {}, _b[sequelize_1.Op.lt] = 6, _b),
                                phone: (_c = {}, _c[sequelize_1.Op.not] = "", _c),
                                stageV2: (_d = {}, _d[sequelize_1.Op.is] = null, _d),
                                optedOut: (_e = {}, _e[sequelize_1.Op.not] = true, _e),
                                id: (_f = {}, _f[sequelize_1.Op.notIn] = leadsIdsCheck, _f),
                                createdAt: (_g = {}, _g[sequelize_1.Op.between] = [greaterTime, checkTime], _g),
                            },
                        })];
                case 1:
                    allLeads = _j.sent();
                    leadsArr_1 = [];
                    return [4 /*yield*/, Promise.all(allLeads.map(function (lead) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, leadsArr_1.push({
                                            leadId: lead.dataValues.id,
                                            tempStep: stepPhone,
                                            phone: lead.phone,
                                            uuid: lead.uuid,
                                        })];
                                    case 1:
                                        _a.sent();
                                        return [4 /*yield*/, Promise.resolve("ok")];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    _j.sent();
                    return [4 /*yield*/, SMS.bulkCreate(leadsArr_1, { returning: true })];
                case 3:
                    initialAdds = _j.sent();
                    msgData = [];
                    i = 0;
                    _j.label = 4;
                case 4:
                    if (!(i < leadsArr_1.length)) return [3 /*break*/, 9];
                    data = leadsArr_1[i];
                    return [4 /*yield*/, (0, shortenUrl_1.default)(data.uuid, "reengage", 1)];
                case 5:
                    url = _j.sent();
                    return [4 /*yield*/, (0, shortenUrl_1.default)(data.uuid, "opt-out", 1)];
                case 6:
                    optOutLink = _j.sent();
                    _h = {
                        source: "sdk",
                        to: data.phone
                    };
                    return [4 /*yield*/, (0, reengageSmsTemplate_1.default)(stepPhone, url, optOutLink)];
                case 7:
                    smsMessage = (_h.body = _j.sent(),
                        _h.from = "YPTR",
                        _h);
                    msgData.push(smsMessage);
                    _j.label = 8;
                case 8:
                    i++;
                    return [3 /*break*/, 4];
                case 9: return [2 /*return*/, { msgData: msgData, leadsArr: leadsArr_1 }];
                case 10:
                    err_1 = _j.sent();
                    console.log("Error in formatting phone v1", err_1);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
};
exports.phoneV1 = phoneV1;
