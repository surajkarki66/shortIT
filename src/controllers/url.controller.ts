import { nanoid } from "nanoid";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

import Url from "../models/Url";
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
const updateUrl: RequestHandler = async (
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
    const { urlId } = req.params;
    const { title }: IUrlDocument = req.body;
    const updateObject = { title };
    const { success, data, statusCode } = await Url.updateById(
      urlId,
      updateObject
    );
    if (success) {
      const result = {
        status: "success",
        data: data,
      };
      const serverResponse = {
        result: result,
        statusCode: statusCode,
        contentType: "application/json",
      };
      return writeServerResponse(res, serverResponse);
    }
    next(ApiError.notFound(data.message));
    return;
  } catch (error) {
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};

const deleteUrl: RequestHandler = async (
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
    const { urlId } = req.params;
    const { success, data, statusCode } = await Url.deleteById(urlId);
    if (success) {
      const result = {
        status: "success",
        data: data,
      };
      const serverResponse = {
        result: result,
        statusCode: statusCode,
        contentType: "application/json",
      };
      return writeServerResponse(res, serverResponse);
    }
    next(ApiError.notFound(data.message));
    return;
  } catch (error) {
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};
export default { generateShortUrl, updateUrl, deleteUrl };
