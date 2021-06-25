import { Response } from "express";

export interface IResponseData {
  result: any;
  statusCode: number;
  contentType: string;
}

function writeServerResponse(res: Response, responseData: IResponseData) {
  const { result, statusCode, contentType } = responseData;
  res.setHeader("Content-Type", contentType);
  return res.status(statusCode).json(result);
}

export default writeServerResponse;
