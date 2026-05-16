import { Router } from 'express';
import { loginUser } from '../controllers/authController.js';

const router = Router();

router.post('/login', loginUser);
router.post('/register', loginUser);

export default router;
