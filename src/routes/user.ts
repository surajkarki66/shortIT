import { Router } from 'express';

import { validateUser, checkAuth } from '../middlewares/userValidation';
import UserController from '../controllers/user';

const router = Router();

router.post('/signup', validateUser('signup'), UserController.signUp);
router.post('/login', validateUser('login'), UserController.login);
router.get('/me', checkAuth, UserController.me);

export default router;
