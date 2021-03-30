import { Router } from 'express';

//import { validateUrl } from '../middlewares/urlValidation';
import UrlController from '../controllers/url';

export default class IndexRoutes {
	router: Router;
	private urlController: UrlController = new UrlController();

	constructor() {
		this.router = Router();
		this.routes();
	}
	public routes(): void {
		this.router.get('/:code', this.urlController.goToUrl);
	}
}
