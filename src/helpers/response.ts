import { Response } from "express";
import { IResponseData } from "./types/IResponseData";

function writeServerResponse(
  res: Response,
  responseData: IResponseData
): Response<any, Record<string, any>> {
  const { result, statusCode, contentType } = responseData;
  res.setHeader("Content-Type", contentType);
  return res.status(statusCode).json(result);
}

export default writeServerResponse;
