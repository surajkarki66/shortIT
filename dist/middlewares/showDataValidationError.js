"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const errorFormatter_1 = __importDefault(require("../helpers/errorFormatter"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const showDataValidationResult = (req, res, next) => {
    const errors = express_validator_1.validationResult(req).formatWith(errorFormatter_1.default);
    if (!errors.isEmpty()) {
        const msg = errors.array();
        next(apiError_1.default.badRequest(msg[0]));
        return;
    }
    return next();
};
exports.default = showDataValidationResult;
//# sourceMappingURL=showDataValidationError.js.map