import { Request, Response, NextFunction } from 'express';

import ApiError from './apiError';
import writeServerResponse from '../helpers/response';

const apiErrorHandler = (
	err: ApiError,
	_req: Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	_next: NextFunction,
): Response<any, Record<string, any>> => {
	let serverResponse = {
		result: {
			status: 'failed',
			data: { error: err.message },
		},
		statusCode: err.code,
		contentType: 'application/json',
	};
	if (err instanceof ApiError) {
		return writeServerResponse(res, serverResponse);
	}
	serverResponse = {
		...serverResponse,
		statusCode: 500,
	};
	return writeServerResponse(res, serverResponse);
};

export default apiErrorHandler;
