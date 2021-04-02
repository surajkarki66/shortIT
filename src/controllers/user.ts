import { Types } from "mongoose";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

import User from "../models/user";
import ApiError from "../errors/apiError";
import writeServerResponse from "../helpers/response";
import errorFormatter from "../helpers/errorFormatter";
import { signToken } from "../helpers/jwtHelper";
import { IUserDocument } from "../interfaces/user";

export default class UserController {
  public async signup(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        const msg = errors.array();
        next(ApiError.badRequest(msg[0]));
        return;
      }

      const userFromBody: IUserDocument = req.body;
      const { email } = userFromBody;

      let user = await User.findByEmail(email);
      if (user) {
        next(ApiError.badRequest("Email already taken."));
        return;
      }
      user = new User(userFromBody);

      await user.save();

      const result: { status: string; data: IUserDocument } = {
        status: "success",
        data: user,
      };
      const serverResponse = {
        result: result,
        statusCode: 201,
        contentType: "application/json",
      };

      return writeServerResponse(res, serverResponse);
    } catch (error) {
      next(ApiError.internal(`Something went wrong: ${error.message}`));
      return;
    }
  }

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      if (!errors.isEmpty()) {
        const msg = errors.array();
        next(ApiError.badRequest(msg[0]));
        return;
      }
      const { email, password } = req.body;
      const user = await User.findByEmail(email);
      if (!user) {
        next(ApiError.badRequest("Email is incorrect."));
        return;
      }
      const newUser = new User(user);
      if (await newUser.comparePassword(password)) {
        const payload = { _id: newUser._id };
        const accessToken = signToken(payload, "1h");
        const result = {
          status: "success",
          data: { accessToken: accessToken },
        };
        const serverResponse = {
          result: result,
          statusCode: 200,
          contentType: "application/json",
        };
        res.cookie("AccessToken", accessToken, {
          httpOnly: true,
          maxAge: 3600000,
        });
        return writeServerResponse(res, serverResponse);
      } else {
        next(ApiError.badRequest("Incorrect password."));
        return;
      }
    } catch (error) {
      next(ApiError.internal(`Something went wrong: ${error.message}`));
      return;
    }
  }
  public async me(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | undefined> {
    try {
      const { id } = req.user;
      const userId = Types.ObjectId(id);
      const user = await User.findMe(userId);
      if (user[0]) {
        const result = { status: "success", data: user[0] };
        const serverResponse = {
          result: result,
          statusCode: 200,
          contentType: "application/json",
        };
        return writeServerResponse(res, serverResponse);
      }
      next(ApiError.notFound("User not found"));
      return;
    } catch (error) {
      next(ApiError.internal(`Something went wrong: ${error.message}`));
      return;
    }
  }
}
