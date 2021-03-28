import { Router } from 'express';

import { validateUser, checkAuth } from '../middlewares/userValidation';
import UserController from '../controllers/user';

export default class UserRoutes {
	router: Router;
	private userController: UserController = new UserController();

	constructor() {
		this.router = Router();
		this.routes();
	}
	public routes(): void {
		this.router.post('/register', validateUser('signup'), this.userController.signup);
		this.router.post('/login', validateUser('login'), this.userController.login);
		this.router.get('/me', checkAuth, this.userController.me);
	}
}
