import { body, ValidationChain, param } from "express-validator";

const validateUrl = (method: string): ValidationChain[] => {
  switch (method) {
    case "generateUrl": {
      return [
        body("longUrl", "Long url is required")
          .notEmpty()
          .isString()
          .withMessage("Long url must be string."),
        body("code").optional().isString().withMessage("Code must be string."),
      ];
    }
    case "generateGuestUrl": {
      return [
        body("longUrl", "Long url is required")
          .notEmpty()
          .isString()
          .withMessage("Long url must be string."),
      ];
    }
    case "checkCode": {
      return [
        param("code", "Code is required")
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

    default:
      return [];
  }
};

export { validateUrl };
