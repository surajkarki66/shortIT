import { body, ValidationChain } from 'express-validator';

const validateUrl = (method: string): ValidationChain[] => {
	switch (method) {
		case 'generateUrl': {
			return [
				body('longUrl', 'Long url is required')
					.notEmpty()
					.isString()
					.withMessage('Long url must be string.'),
				body('code').optional().isString().withMessage('Code must be string.'),
			];
		}

		default:
			return [];
	}
};

export { validateUrl };
