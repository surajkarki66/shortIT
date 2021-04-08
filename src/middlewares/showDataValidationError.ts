import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

import errorFormatter from "../helpers/errorFormatter";
import ApiError from "../errors/apiError";

const showDataValidationResult: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) {
    const msg = errors.array();
    next(ApiError.badRequest(msg[0]));
    return;
  }
  return next();
};

export default showDataValidationResult;
