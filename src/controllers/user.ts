import { validationResult } from 'express-validator';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { IUserDocument } from '../interfaces/user';
import User from '../models/user';
import writeServerResponse from '../helpers/response';
import ApiError from '../errors/apiError';
import errorFormatter from '../helpers/errorFormatter';
import { signToken, verifyToken } from '../helpers/jwtHelper';

const signUp: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const errors = validationResult(req).formatWith(errorFormatter);
		if (!errors.isEmpty()) {
			const msg = errors.array();
			next(ApiError.badRequest(msg[0]));
			return;
		}
		const userFromBody: IUserDocument = req.body;
		const { email } = userFromBody;

		const isEmail = await User.findByEmail(email);
		if (isEmail) {
			next(ApiError.badRequest('Email already taken.'));
			return;
		}
		const user = new User(userFromBody);

		const result = await user.save();
		if (result) {
			const serverResponse = {
				result: result,
				statusCode: 201,
				contentType: 'application/json',
			};
			writeServerResponse(res, serverResponse);
		}
	} catch (error) {
		next(ApiError.internal(`Something went wrong: ${error.message}`));
		return;
	}
};

const login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
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
			next(ApiError.badRequest('Email is incorrect.'));
			return;
		}
		const newUser = new User(user);
		if (await newUser.comparePassword(password)) {
			const payload = { _id: newUser._id };
			const accessToken = signToken(payload, '1h');
			const result = { status: 'success', data: { accessToken: accessToken } };
			const serverResponse = {
				result: result,
				statusCode: 201,
				contentType: 'application/json',
			};
			res.cookie('AccessToken', accessToken, {
				httpOnly: true,
				maxAge: 3600000,
			});
			return writeServerResponse(res, serverResponse);
		} else {
			next(ApiError.badRequest('Incorrect password.'));
			return;
		}
	} catch (error) {
		next(ApiError.internal(`Something went wrong: ${error.message}`));
		return;
	}
};

export default { signUp, login };
