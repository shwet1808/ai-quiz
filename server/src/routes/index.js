import { Router } from 'express';
import authRoutes from './authRoutes.js';
import quizRoutes from './quizRoutes.js';
import userRoutes from './userRoutes.js';
import leaderboardRoutes from './leaderboardRoutes.js';

const router = Router();

router.get('/health', async (req, res) => {
  res.json({
    success: true,
    message: 'AI Quiz API is healthy',
    timestamp: new Date().toISOString()
  });
});

router.use('/auth', authRoutes);
router.use('/generate', quizRoutes);
router.use('/upload', quizRoutes);
router.use('/quizzes', quizRoutes);
router.use('/users', userRoutes);
router.use('/leaderboard', leaderboardRoutes);

export default router;
