import validUrl from 'valid-url';
import { nanoid } from 'nanoid';
import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

import Url from '../models/url';
import ApiError from '../errors/apiError';
import config from '../configs/config';
import writeServerResponse from '../helpers/response';
import errorFormatter from '../helpers/errorFormatter';
import { IUrlDocument } from '../interfaces/url';

export default class UserController {
	public async generateUrl(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<Response<any, Record<string, any>> | undefined> {
		try {
			const errors = validationResult(req).formatWith(errorFormatter);
			if (!errors.isEmpty()) {
				const msg = errors.array();
				next(ApiError.badRequest(msg[0]));
				return;
			}
			const urlBody: IUrlDocument = req.body;
			const BASE_URL = String(config.baseUrl);

			const { longUrl, code } = urlBody;
			const { id } = req.user;

			if (!validUrl.isUri(BASE_URL)) {
				next(ApiError.badRequest('Invalid base url'));
				return;
			}

			const urlCode = nanoid(6);

			if (validUrl.isUri(longUrl)) {
				let url = await Url.findByLongUrl(longUrl);
				let result: { status: string; data: IUrlDocument };

				if (url) {
					result = { status: 'success', data: url };
					const serverResponse = {
						result: result,
						statusCode: 201,
						contentType: 'application/json',
					};
					return writeServerResponse(res, serverResponse);
				}
				if (code) {
					const checkCode = await Url.findByCode(code);
					if (!checkCode) {
						const shortUrl = `${BASE_URL}/${code}`;
						url = new Url({
							id,
							longUrl,
							shortUrl,
							code,
							date: new Date(),
						});
						await url.save();
						result = { status: 'success', data: url };
						const serverResponse = {
							result: result,
							statusCode: 201,
							contentType: 'application/json',
						};
						return writeServerResponse(res, serverResponse);
					} else {
						next(ApiError.conflict('Sorry URL already exists'));
						return;
					}
				} else {
					const shortUrl = `${BASE_URL}/${urlCode} `;
					url = new Url({
						id,
						longUrl,
						shortUrl,
						urlCode,
						date: new Date(),
					});
					await url.save();
					result = { status: 'success', data: url };
					const serverResponse = {
						result: result,
						statusCode: 201,
						contentType: 'application/json',
					};
					return writeServerResponse(res, serverResponse);
				}
			} else {
				next(ApiError.badRequest('The URL you are trying to shorten is invalid'));
				return;
			}
		} catch (error) {
			next(ApiError.internal(`Something went wrong: ${error.message}`));
			return;
		}
	}
}
