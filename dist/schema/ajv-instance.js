"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ESM/TypeScript import
var ajv_1 = __importDefault(require("ajv"));
var ajv_formats_1 = __importDefault(require("ajv-formats"));
var ajvInstance = new ajv_1.default();
ajvInstance.addFormat("date-custom", {
    type: "string",
    validate: function (data) {
        var dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
        return dateRegex.test(data);
    },
});
(0, ajv_formats_1.default)(ajvInstance);
exports.default = ajvInstance;
