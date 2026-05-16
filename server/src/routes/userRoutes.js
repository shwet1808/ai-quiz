import { Router } from 'express';
import { getUserProfile, getUserHistory } from '../controllers/userController.js';

const router = Router();

router.get('/:username/profile', getUserProfile);
router.get('/:username/history', getUserHistory);

export default router;
