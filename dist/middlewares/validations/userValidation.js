"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function userValidation(method) {
    switch (method) {
        case "signup": {
            return [
                express_validator_1.body("firstName", "First Name is required")
                    .notEmpty()
                    .trim()
                    .isString()
                    .withMessage("First Name must be string")
                    .isLength({
                    min: 2,
                    max: 32,
                })
                    .withMessage("First Name must be between 3 to 32 characters"),
                express_validator_1.body("lastName", "Last Name is required")
                    .notEmpty()
                    .trim()
                    .isString()
                    .withMessage("Last Name must be string")
                    .isLength({
                    min: 2,
                    max: 32,
                })
                    .withMessage("Last Name must be between 3 to 32 characters"),
                express_validator_1.body("email", "Email is required")
                    .isEmail()
                    .notEmpty()
                    .normalizeEmail()
                    .withMessage("Must be a valid email address"),
                express_validator_1.body("password", "Password is required")
                    .notEmpty()
                    .isString()
                    .withMessage("Password must be string")
                    .isLength({ min: 6, max: 255 })
                    .withMessage("Password must be greater than 6 ")
                    .matches("[0-9]")
                    .withMessage("Password Must Contain a Number")
                    .matches("[A-Z]")
                    .withMessage("Password Must Contain an Uppercase"),
            ];
        }
        case "login": {
            return [
                express_validator_1.body("email", "Email is required")
                    .isEmail()
                    .notEmpty()
                    .normalizeEmail()
                    .withMessage("Must be a valid email address"),
                express_validator_1.body("password", "Password is required")
                    .notEmpty()
                    .isString()
                    .withMessage("Password must be string"),
            ];
        }
        case "forgotPassword": {
            return [
                express_validator_1.body("email", "Email is required")
                    .isEmail()
                    .notEmpty()
                    .normalizeEmail()
                    .withMessage("Must be a valid email address"),
            ];
        }
        case "resetPassword": {
            return [
                express_validator_1.body("newPassword", "Password is required")
                    .notEmpty()
                    .isString()
                    .withMessage("New Password must be string")
                    .isLength({ min: 6, max: 255 })
                    .withMessage("New Password must be greater than 6 ")
                    .matches("[0-9]")
                    .withMessage("New Password Must Contain a Number")
                    .matches("[A-Z]")
                    .withMessage("New Password Must Contain an Uppercase"),
                express_validator_1.body("token", "Token is required")
                    .notEmpty()
                    .isJWT()
                    .withMessage("Token must be valid"),
            ];
        }
        case "verifyEmail": {
            return [
                express_validator_1.body("userId", "UserId is required")
                    .notEmpty()
                    .isMongoId()
                    .withMessage("UserId must be objectId"),
            ];
        }
        case "activation": {
            return [
                express_validator_1.body("token", "Token is required")
                    .notEmpty()
                    .isJWT()
                    .withMessage("Token must be valid"),
            ];
        }
        case "changeEmail": {
            return [
                express_validator_1.body("email", "Email is required")
                    .isEmail()
                    .notEmpty()
                    .normalizeEmail()
                    .withMessage("Must be a valid email address"),
                express_validator_1.param("userId", "UserId is required")
                    .notEmpty()
                    .isMongoId()
                    .withMessage("UserId must be objectId"),
            ];
        }
        case "changePassword": {
            return [
                express_validator_1.param("userId", "UserId is required")
                    .notEmpty()
                    .isMongoId()
                    .withMessage("UserId must be objectId"),
                express_validator_1.body("newPassword", "New password is required")
                    .notEmpty()
                    .isString()
                    .withMessage("New Password must be string")
                    .isLength({ min: 6, max: 255 })
                    .withMessage("New Password must be greater than 6")
                    .matches("[0-9]")
                    .withMessage("New Password Must Contain a Number")
                    .matches("[A-Z]")
                    .withMessage("New Password Must Contain an Uppercase"),
                express_validator_1.body("oldPassword", "Old password is required")
                    .notEmpty()
                    .isString()
                    .withMessage("Old Password must be string")
                    .isLength({ min: 6, max: 255 })
                    .withMessage("Old Password must be greater than 6")
                    .matches("[0-9]")
                    .withMessage("Old Password Must Contain a Number")
                    .matches("[A-Z]")
                    .withMessage("Old Password Must Contain an Uppercase"),
            ];
        }
        case "changeUserDetails": {
            return [
                express_validator_1.param("userId", "UserId is required")
                    .notEmpty()
                    .isMongoId()
                    .withMessage("UserId must be objectId"),
                express_validator_1.body("firstName", "First Name is required")
                    .notEmpty()
                    .isLength({
                    min: 2,
                    max: 32,
                })
                    .withMessage("First Name must be between 3 to 32 characters"),
                express_validator_1.body("lastName", "Last Name is required")
                    .notEmpty()
                    .isLength({
                    min: 2,
                    max: 32,
                })
                    .withMessage("Last Name must be between 3 to 32 characters"),
            ];
        }
        case "deleteUser": {
            return [
                express_validator_1.param("userId", "UserId is required")
                    .notEmpty()
                    .isMongoId()
                    .withMessage("UserId must be objectId"),
                express_validator_1.body("password", "Password is required")
                    .notEmpty()
                    .isString()
                    .withMessage("Password must be string")
                    .isLength({ min: 6, max: 255 })
                    .withMessage("Password must be greater than 6 ")
                    .matches("[0-9]")
                    .withMessage("Password Must Contain a Number")
                    .matches("[A-Z]")
                    .withMessage("Password Must Contain an Uppercase"),
            ];
        }
        default:
            return [];
    }
}
exports.default = userValidation;
//# sourceMappingURL=userValidation.js.map