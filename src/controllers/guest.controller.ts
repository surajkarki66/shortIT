import { nanoid } from "nanoid";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

import GuestUrl from "../models/Guest";
import ApiError from "../errors/apiError";
import config from "../configs/config";
import writeServerResponse from "../helpers/response";
import validateUrl from "../helpers/validateUrl";
import errorFormatter from "../helpers/errorFormatter";
import { IGuestUrlDocument } from "../interfaces/guest";

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
    const urlBody: IGuestUrlDocument = req.body;
    const BASE_URL = String(config.baseUrl);

    const { longUrl } = urlBody;

    await validateUrl(BASE_URL);

    const address = await validateUrl(longUrl);
    if (address) {
      const urlCode = nanoid(7);
      let url = await GuestUrl.findByLongUrl(longUrl);
      let result: { status: string; data: IGuestUrlDocument };

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
        url = new GuestUrl({
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
    if (code === "ENOTFOUND" || "ERR_INVALID_URL") {
      next(
        ApiError.badRequest(
          "The given link is currently not working or invalid"
        )
      );
      return;
    }
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};

export default { generateShortUrl };
