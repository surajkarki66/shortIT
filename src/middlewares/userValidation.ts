import { body, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import ApiError from '../errors/apiError';
import config from '../configs/config';
import { verifyToken } from '../helpers/jwtHelper';

interface TokenPayload {
	_id: string;
	iat: number;
	exp: number;
	error: string;
}
const checkAuth = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
	if (req.headers['authorization']) {
		const authorization = req.headers['authorization'].split(' ');
		if (authorization[0] !== 'Bearer') {
			next(ApiError.unauthorized('Authentication failed.'));
			return;
		} else {
			try {
				const response = await verifyToken(authorization[1], String(config.jwtSecret));
				const { _id, error } = (response as unknown) as TokenPayload;
				if (_id) {
					req.user = { id: _id };
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
		next(ApiError.unauthorized('Authentication failed'));
		return;
	}
};

const validateUser = (method: string): ValidationChain[] => {
	switch (method) {
		case 'signup': {
			return [
				body('firstName', 'First Name is required')
					.notEmpty()
					.isLength({
						min: 2,
						max: 32,
					})
					.withMessage('First Name must be between 3 to 32 characters'),
				body('lastName', 'Last Name is required')
					.notEmpty()
					.isLength({
						min: 2,
						max: 32,
					})
					.withMessage('Last Name must be between 3 to 32 characters'),
				body('email', 'Email is required')
					.isEmail()
					.notEmpty()
					.normalizeEmail()
					.withMessage('Must be a valid email address'),
				body('password', 'Password is required')
					.notEmpty()
					.isLength({ min: 6, max: 255 })
					.withMessage('Password must be greater than 6 '),
			];
		}
		case 'login': {
			return [
				body('email', 'Email is required')
					.isEmail()
					.notEmpty()
					.normalizeEmail()
					.withMessage('Must be a valid email address'),
				body('password', 'Password is required')
					.notEmpty()
					.isLength({ min: 6, max: 255 })
					.withMessage('Password must be greater than 6 '),
			];
		}
		default:
			return [];
	}
};

export { checkAuth, validateUser };
