import { ROLE } from "./../interfaces/user";
import { validationResult } from "express-validator";
import { Request, Response, NextFunction, RequestHandler } from "express";

import User from "../models/User";
import Url from "../models/Url";
import ApiError from "../errors/apiError";
import writeServerResponse from "../helpers/response";
import errorFormatter from "../helpers/errorFormatter";
import { signToken, verifyToken } from "../helpers/jwtHelper";
import { IUserDocument } from "../interfaces/user";
import { ITokenPayload } from "../helpers/types/ITokenPayload";
import { IResponseData } from "./../helpers/response";
import config from "../configs/config";
import transporter from "../configs/nodemailer";

interface ILogin {
  email: string;
  password: string;
}

const signup: RequestHandler = async (
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
};

const login: RequestHandler = async (
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
    const { email, password }: ILogin = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      next(ApiError.badRequest("Email is incorrect."));
      return;
    }
    const newUser = new User(user);
    if (await newUser.comparePassword(password)) {
      const payload = { _id: newUser._id.toString(), role: newUser.role };
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
};
const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.user;
    const user = await User.findMe(id);
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
};

const forgotPassword: RequestHandler = async (
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
    const { email }: IUserDocument = req.body;
    const user = await User.findByEmail(email);
    if (user) {
      const { _id, role } = user;
      const payload = { _id: _id.toString(), role };
      const token = signToken(payload, "5m");
      const mailOptions = {
        from: config.nodeMailer.email,
        to: email,
        subject: `Password Reset link`,
        html: `
                    <h1>Please use the following link to reset your password</h1>
                    <p>${config.url}/user/password-reset/${token}</p>
                    <hr />
                    <p>This email may contain sensitive information</p>
                    <p>${config.url}</p>
                `,
      };
      transporter.sendMail(mailOptions, (error, _body) => {
        if (error) {
          next(ApiError.internal(`Something went wrong: ${error.message}`));
          return;
        }
        const result = {
          status: "success",
          data: {
            message: `Email has been sent to ${email}. Follow the instruction to reset your password.`,
          },
        };
        const serverResponse = {
          result: result,
          statusCode: 200,
          contentType: "application/json",
        };
        return writeServerResponse(res, serverResponse);
      });
    } else {
      next(ApiError.notFound("User with that email does not exist"));
      return;
    }
  } catch (error) {
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};

const resetPassword: RequestHandler = async (
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
    const {
      newPassword,
      token,
    }: { newPassword: string; token: string } = req.body;
    const result = await verifyToken({
      token,
      secretKey: String(config.jwtSecret),
    });

    const { _id, error } = (result as unknown) as ITokenPayload;
    if (error) {
      next(ApiError.badRequest(error));
      return;
    }
    const updateObject = {
      password: await User.manualHashPassword(newPassword),
    };
    const { success, data, statusCode } = await User.updateById(
      _id,
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

const verifyEmail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    if (user) {
      let serverResponse: IResponseData;
      let result;
      const { _id, status, email, role } = user;

      if (status === "inactive") {
        const payload = { _id: _id.toString(), role };
        const token = signToken(payload, "5m");
        const mailOptions = {
          from: config.nodeMailer.email,
          to: email,
          subject: "Account activation link",
          body: "Thank you for choosing ShortIT !",
          html: `
           		<h1>Please use the following to activate your account</h1>
           		<p>${config.url}/user/activate/${token}</p>
           		<hr />
           		<p>This email may contain sensitive information</p>
           		<p>${config.url}</p>
           		 `,
        };
        transporter.sendMail(mailOptions, (error, body) => {
          if (error) {
            next(ApiError.internal(`Something went wrong: ${error.message}`));
            return;
          }
          result = {
            status: "success",
            data: {
              message: "Confirmation email is sent! Please check your email.",
            },
          };
          serverResponse = {
            result: result,
            statusCode: 200,
            contentType: "application/json",
          };
          return writeServerResponse(res, serverResponse);
        });
      } else {
        result = {
          status: "success",
          data: {
            message: "Email is already verified",
          },
        };
        serverResponse = {
          result: result,
          statusCode: 200,
          contentType: "application/json",
        };
        return writeServerResponse(res, serverResponse);
      }
    } else {
      next(ApiError.notFound("User doesn't exist."));
      return;
    }
  } catch (error) {
    next(ApiError.internal(`Something went wrong: ${error.message}`));
    return;
  }
};

const activation: RequestHandler = async (
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
    const { token }: { token: string } = req.body;
    const result = await verifyToken({
      token,
      secretKey: String(config.jwtSecret),
    });

    const { _id, error } = (result as unknown) as ITokenPayload;
    if (error) {
      next(ApiError.badRequest(error));
      return;
    }
    const updateObject = {
      status: "active",
    };
    const { statusCode, success, data } = await User.updateById(
      _id,
      updateObject
    );
    if (success) {
      const response = {
        status: "success",
        data: { message: "User activated successfully." },
      };
      const serverResponse = {
        result: response,
        statusCode: statusCode,
        contentType: "application/json",
      };
      return writeServerResponse(res, serverResponse);
    } else {
      next(ApiError.notFound(data.message));
      return;
    }
  } catch (err) {
    next(ApiError.internal(`Something went wrong. ${err.message}`));
    return;
  }
};

const changeEmail: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { email }: { email: string } = req.body;
    const user = await User.findByEmail(email);
    const { id, role } = req.user;

    if (user && user._id.toString() !== userId) {
      next(ApiError.conflict("Email is already taken"));
      return;
    }
    const updateObject = {
      email: email,
      status: "inactive",
    };
    const { success, statusCode, data } = await User.updateById(
      userId,
      updateObject
    );
    if (success) {
      const newRole = <ROLE>role;
      const payload = { _id: id, role: newRole };
      const token = signToken(payload, "5m");
      const mailOptions = {
        from: config.nodeMailer.email,
        to: email,
        subject: "Account activation link",
        body: "Thank you for choosing Glasir !",
        html: `
						 <h1>Please use the following to activate your account</h1>
						 <p>${config.url}/user/activate/${token}</p>
						 <hr />
						 <p>This email may contain sensitive information</p>
						 <p>${config.url}</p>
							`,
      };
      transporter.sendMail(mailOptions, (error, body) => {
        if (error) {
          next(ApiError.internal(`Something went wrong: ${error.message}`));
          return;
        }
        const result = {
          status: "success",
          data: {
            message: "Confirmation email is sent! Please check your email.",
          },
        };
        const serverResponse = {
          result: result,
          statusCode: statusCode,
          contentType: "application/json",
        };
        return writeServerResponse(res, serverResponse);
      });
    } else {
      next(ApiError.notFound(data.message));
      return;
    }
  } catch (error) {
    next(ApiError.internal(`Something went wrong. ${error.message}`));
    return;
  }
};

const changePassword: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const {
      oldPassword,
      newPassword,
    }: { oldPassword: string; newPassword: string } = req.body;

    const user = await User.findById(userId);
    if (user) {
      const newUser = new User(user);
      if (!(await newUser.comparePassword(oldPassword))) {
        next(ApiError.unauthorized("Make sure your password is correct."));
        return;
      }
      const updateObject = {
        password: await User.manualHashPassword(newPassword),
      };
      const { success, statusCode, data } = await User.updateById(
        userId,
        updateObject
      );
      if (success) {
        const result = {
          status: "success",
          data: { message: "Password changed successfully." },
        };
        const serverResponse = {
          result: result,
          statusCode: statusCode,
          contentType: "application/json",
        };
        return writeServerResponse(res, serverResponse);
      } else {
        next(ApiError.notFound(data.message));
        return;
      }
    }
    next(ApiError.notFound("User doesn't exist."));
    return;
  } catch (error) {
    next(ApiError.internal(`Something went wrong. ${error.message}`));
    return;
  }
};

const changeUserDetails: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userDetails: IUserDocument = req.body;
    const { userId } = req.params;
    const updateObject = { ...userDetails };

    const { success, data, statusCode } = await User.updateById(
      userId,
      updateObject
    );

    if (success) {
      const result = {
        status: "success",
        data: { message: "Update successfully." },
      };
      const serverResponse = {
        result: result,
        statusCode: statusCode,
        contentType: "application/json",
      };
      return writeServerResponse(res, serverResponse);
    } else {
      next(ApiError.notFound(data.message));
      return;
    }
  } catch (error) {
    next(ApiError.internal(`Something went wrong. ${error.message}`));
    return;
  }
};
const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password }: { password: string } = req.body;
    const { userId } = req.params;

    const user = await User.findById(userId);
    if (user) {
      const newUser = new User(user);

      if (!(await newUser.comparePassword(password))) {
        next(ApiError.unauthorized("Make sure your password is correct."));
        return;
      }
      const deleteUser = User.deleteById(userId);
      const deleteUrl = Url.deleteByUserId(userId);
      await Promise.all([deleteUser, deleteUrl]);
      const result = {
        status: "success",
        data: { message: "User is deleted successfully" },
      };
      const serverResponse = {
        result: result,
        statusCode: 200,
        contentType: "application/json",
      };
      return writeServerResponse(res, serverResponse);
    }
    next(ApiError.notFound("User doesn't exist."));
    return;
  } catch (e) {
    next(ApiError.internal(`Something went wrong: ${e.message}`));
    return;
  }
};
export default {
  signup,
  login,
  me,
  forgotPassword,
  resetPassword,
  verifyEmail,
  activation,
  changeEmail,
  changePassword,
  changeUserDetails,
  deleteUser,
};
