import { Request, Response, NextFunction, RequestHandler } from "express";

import Url from "../models/Url";
import GuestUrl from "../models/Guest";
import ApiError from "../errors/apiError";

const goToUrl: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.params;
    const url = Url.findByCode(code);
    const guestUrl = GuestUrl.findByCode(code);
    const result = await Promise.all([url, guestUrl]);
    if (result[0]) {
      const { _id, longUrl } = result[0];
      const updateObject = { accessedDates: new Date() };
      await Url.updateAccessedDatesById(_id, updateObject);
      return res.redirect(longUrl);
    }
    if (result[1]) {
      const { longUrl } = result[1];
      return res.redirect(longUrl);
    } else {
      return res.status(404).json("No URL Found");
    }
  } catch (error) {
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};

export default { goToUrl };
