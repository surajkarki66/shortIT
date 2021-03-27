import { body, ValidationChain } from 'express-validator';

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

export default validateUser;
