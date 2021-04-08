import { body, param, ValidationChain } from "express-validator";

export default function userValidation(method: string): ValidationChain[] {
  switch (method) {
    case "signup": {
      return [
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
          .withMessage("Password must be greater than 6 "),
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
          .withMessage("Password must be greater than 6 "),
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
          .withMessage("Password must be string")
          .isLength({ min: 6, max: 255 })
          .withMessage("Password must be greater than 6 "),
        body("token", "Token is required")
          .notEmpty()
          .isString()
          .withMessage("Token must be string"),
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
          .isString()
          .withMessage("Token must be string"),
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
    default:
      return [];
  }
}
