"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controllers_1 = __importDefault(require("../controllers"));
var router = (0, express_1.Router)();
router.post("/:url", controllers_1.default.scrapeUrl);
exports.default = router;
