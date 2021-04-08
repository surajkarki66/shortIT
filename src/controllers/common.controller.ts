import path from "path";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

import Url from "../models/Url";
import GuestUrl from "../models/Guest";
import ApiError from "../errors/apiError";
import errorFormatter from "../helpers/errorFormatter";

const goToUrl: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req).formatWith(errorFormatter);
    const options = {
      root: path.join(__dirname, "../../public"),
      dotfiles: "deny",
      headers: {
        "x-timestamp": Date.now(),
        "x-sent": true,
      },
    };
    if (!errors.isEmpty()) {
      return res.sendFile("invalid.html", options);
    }
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
      return res.sendFile("invalid.html", options);
    }
  } catch (error) {
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};

export default { goToUrl };
