import { Router } from 'express';

import { validateUrl } from '../middlewares/urlValidation';
import { checkAuth } from '../middlewares/userValidation';
import UrlController from '../controllers/url';

export default class UrlRoutes {
	router: Router;
	private urlController: UrlController = new UrlController();

	constructor() {
		this.router = Router();
		this.routes();
	}
	public routes(): void {
		this.router.post(
			'/generateUrl',
			checkAuth,
			validateUrl('generateUrl'),
			this.urlController.generateUrl,
		);
	}
}
