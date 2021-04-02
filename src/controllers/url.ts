import path from "path";
import { nanoid } from "nanoid";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

import Url from "../models/url";
import GuestUrl from "../models/guest";
import ApiError from "../errors/apiError";
import config from "../configs/config";
import validateUrl from "../helpers/validateUrl";
import writeServerResponse from "../helpers/response";
import errorFormatter from "../helpers/errorFormatter";
import { IUrlDocument } from "../interfaces/url";

const generateShortUrl: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
      const msg = errors.array();
      next(ApiError.badRequest(msg[0]));
      return;
    }
    const urlBody: IUrlDocument = req.body;
    const BASE_URL = String(config.baseUrl);

    const { longUrl } = urlBody;
    const { id } = req.user;

    await validateUrl(BASE_URL);

    const address = await validateUrl(longUrl);
    if (address) {
      const urlCode = nanoid(6);
      let url = await Url.findByLongUrl(longUrl);
      let result: { status: string; data: IUrlDocument };

      if (url) {
        result = { status: "success", data: url };
        const serverResponse = {
          result: result,
          statusCode: 201,
          contentType: "application/json",
        };
        return writeServerResponse(res, serverResponse);
      } else {
        const shortUrl = `${BASE_URL}/${urlCode}`;
        url = new Url({
          userId: id,
          longUrl,
          shortUrl,
          code: urlCode,
        });
        await url.save();
        result = { status: "success", data: url };
        const serverResponse = {
          result: result,
          statusCode: 201,
          contentType: "application/json",
        };
        return writeServerResponse(res, serverResponse);
      }
    }
    next(ApiError.notFound("IP address not found"));
    return;
  } catch (error) {
    const { code } = error;
    if (code === "ENOTFOUND") {
      next(ApiError.badRequest("The given link is invalid"));
      return;
    }
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};
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

export default { generateShortUrl, goToUrl };
