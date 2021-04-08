import { Request, Response, NextFunction, RequestHandler } from "express";

import ApiError from "../errors/apiError";
import config from "../configs/config";
import { ROLE } from "../interfaces/user";
import { verifyToken } from "../helpers/jwtHelper";

interface TokenPayload {
  _id: string;
  role: ROLE;
  iat: number;
  exp: number;
  error: string;
}

const authenticate: RequestHandler = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.headers["authorization"]) {
    const authorization = req.headers["authorization"].split(" ");
    if (authorization[0] !== "Bearer") {
      next(ApiError.unauthorized("Authentication failed."));
      return;
    } else {
      try {
        const response = await verifyToken({
          token: authorization[1],
          secretKey: String(config.jwtSecret),
        });
        const { _id, error, role } = (response as unknown) as TokenPayload;
        if (_id) {
          req.user = { id: _id, role };
          return next();
        }
        next(ApiError.forbidden(error));
        return;
      } catch (error) {
        next(ApiError.forbidden(`Token is not verified: ${error}`));
        return;
      }
    }
  } else {
    next(ApiError.unauthorized("Authentication failed"));
    return;
  }
};

const permit = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.user;
    if (roles.includes(role)) {
      next();
    } else {
      next(ApiError.unauthorized(`${role} is not allowed`));
      return;
    }
  };
};

export { authenticate, permit };
