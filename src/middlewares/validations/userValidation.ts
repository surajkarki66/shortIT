import { body, param, ValidationChain, checkSchema } from "express-validator";

export default function userValidation(method: string): ValidationChain[] {
  switch (method) {
    case "signup": {
      return [
        body("firstName", "First Name is required")
          .notEmpty()
          .trim()
          .isString()
          .withMessage("First Name must be string")
          .isLength({
            min: 2,
            max: 32,
          })
          .withMessage("First Name must be between 3 to 32 characters"),
        body("lastName", "Last Name is required")
          .notEmpty()
          .trim()
          .isString()
          .withMessage("Last Name must be string")
          .isLength({
            min: 2,
            max: 32,
          })
          .withMessage("Last Name must be between 3 to 32 characters"),
        body("email", "Email is required")
          .isEmail()
          .notEmpty()
          .normalizeEmail()
          .withMessage("Must be a valid email address"),
        body("password", "Password is required")
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
        body("email", "Email is required")
          .isEmail()
          .notEmpty()
          .normalizeEmail()
          .withMessage("Must be a valid email address"),
        body("password", "Password is required")
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
    case "forgotPassword": {
      return [
        body("email", "Email is required")
          .isEmail()
          .notEmpty()
          .normalizeEmail()
          .withMessage("Must be a valid email address"),
      ];
    }
    case "resetPassword": {
      return [
        body("newPassword", "Password is required")
          .notEmpty()
          .isString()
          .withMessage("New Password must be string")
          .isLength({ min: 6, max: 255 })
          .withMessage("New Password must be greater than 6 ")
          .matches("[0-9]")
          .withMessage("New Password Must Contain a Number")
          .matches("[A-Z]")
          .withMessage("New Password Must Contain an Uppercase"),
        body("token", "Token is required")
          .notEmpty()
          .isJWT()
          .withMessage("Token must be valid"),
      ];
    }
    case "verifyEmail": {
      return [
        body("userId", "UserId is required")
          .notEmpty()
          .isMongoId()
          .withMessage("UserId must be objectId"),
      ];
    }
    case "activation": {
      return [
        body("token", "Token is required")
          .notEmpty()
          .isJWT()
          .withMessage("Token must be valid"),
      ];
    }
    case "changeEmail": {
      return [
        body("email", "Email is required")
          .isEmail()
          .notEmpty()
          .normalizeEmail()
          .withMessage("Must be a valid email address"),
        param("userId", "UserId is required")
          .notEmpty()
          .isMongoId()
          .withMessage("UserId must be objectId"),
      ];
    }
    case "changePassword": {
      return [
        param("userId", "UserId is required")
          .notEmpty()
          .isMongoId()
          .withMessage("UserId must be objectId"),
        body("newPassword", "New password is required")
          .notEmpty()
          .isString()
          .withMessage("New Password must be string")
          .isLength({ min: 6, max: 255 })
          .withMessage("New Password must be greater than 6")
          .matches("[0-9]")
          .withMessage("New Password Must Contain a Number")
          .matches("[A-Z]")
          .withMessage("New Password Must Contain an Uppercase"),
        body("oldPassword", "Old password is required")
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
        param("userId", "UserId is required")
          .notEmpty()
          .isMongoId()
          .withMessage("UserId must be objectId"),

        body("firstName", "First Name is required")
          .notEmpty()
          .isLength({
            min: 2,
            max: 32,
          })
          .withMessage("First Name must be between 3 to 32 characters"),
        body("lastName", "Last Name is required")
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
        param("userId", "UserId is required")
          .notEmpty()
          .isMongoId()
          .withMessage("UserId must be objectId"),

        body("password", "Password is required")
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
