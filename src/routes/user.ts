import { Router } from 'express';

import validateUser from '../middlewares/userValidation';
import UserController from '../controllers/user';

const router = Router();

router.post('/signup', validateUser('signup'), UserController.signUp);
router.post('/login', validateUser('login'), UserController.login);

export default router;
