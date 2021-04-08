import { NextFunction, Request, Response } from "express";

import User from "../../models/User";
import ApiError from "../../errors/apiError";

const onlyOwnerCanDoThis = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  if (req.params && req.params.userId === userId) {
    return next();
  } else if (req.body.userId && req.body.userId === userId) {
    return next();
  } else if (req.params && req.body.userId && req.body.userId === userId) {
    return next();
  } else {
    next(ApiError.forbidden("Only owner can do this action"));
    return;
  }
};

const onlyActiveUserCanDoThis = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const userId = req.user.id;
  const user = await User.findById(userId);
  if (user && user.status === "active") {
    return next();
  }
  next(ApiError.forbidden("Only active user can this action"));
  return;
};

export { onlyOwnerCanDoThis, onlyActiveUserCanDoThis };
