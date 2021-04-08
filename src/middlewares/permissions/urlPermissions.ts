import { NextFunction, Request, Response } from "express";

import ApiError from "../../errors/apiError";
import Url from "../../models/Url";

const onlyOwnerCanDoThis = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const { urlId } = req.params;
    const data = await Url.findById(urlId);
    if (data && data.userId.toString() === id) {
      return next();
    }
    next(ApiError.forbidden("Only owner can do this action"));
    return;
  } catch (error) {
    next(ApiError.internal(`Something went wrong: ${error}`));
    return;
  }
};

export { onlyOwnerCanDoThis };
