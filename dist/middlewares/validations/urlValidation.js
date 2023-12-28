"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function urlValidation(method) {
    switch (method) {
        case "generateUrl": {
            return [
                express_validator_1.body("longUrl", "Long url is required")
                    .notEmpty()
                    .isString()
                    .withMessage("Long url must be string."),
            ];
        }
        case "generateGuestUrl": {
            return [
                express_validator_1.body("longUrl", "Long url is required")
                    .notEmpty()
                    .isString()
                    .withMessage("Long url must be string."),
            ];
        }
        case "checkCode": {
            return [
                express_validator_1.param("code", "Code is required")
                    .notEmpty()
                    .isString()
                    .withMessage("Code must be string")
                    .isLength({
                    min: 6,
                    max: 7,
                })
                    .withMessage("Code must be between 6 to 7 digits"),
            ];
        }
        case "updateUrl": {
            return [
                express_validator_1.param("urlId", "urlId is required")
                    .notEmpty()
                    .isMongoId()
                    .withMessage("urlId must be objectId"),
                express_validator_1.body("title", "Title is required")
                    .notEmpty()
                    .isString()
                    .withMessage("urlId must be string")
                    .isLength({
                    min: 1,
                    max: 250,
                })
                    .withMessage("Title must be between 2 to 250 characters long"),
            ];
        }
        case "deleteUrl": {
            return [
                express_validator_1.param("urlId", "urlId is required")
                    .notEmpty()
                    .isMongoId()
                    .withMessage("urlId must be objectId"),
            ];
        }
        default:
            return [];
    }
}
exports.default = urlValidation;
//# sourceMappingURL=urlValidation.js.map