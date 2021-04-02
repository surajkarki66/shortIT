import { nanoid } from "nanoid";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

import Url from "../models/url";
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
      let url = await Url.findByLongUrlAndUserId(longUrl, id);
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

export default { generateShortUrl };