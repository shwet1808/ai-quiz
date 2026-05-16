import { asyncHandler } from '../utils/asyncHandler.js';
import { readDatabase } from '../services/storageService.js';

export const getLeaderboard = asyncHandler(async (req, res) => {
  const { topic = 'All', difficulty = 'All', timePeriod = 'all' } = req.query;
  const db = await readDatabase();
  const cutoff = getCutoffDate(timePeriod);

  const attempts = db.attempts
    .filter((attempt) => topic === 'All' || attempt.topic === topic)
    .filter((attempt) => difficulty === 'All' || attempt.difficulty === difficulty)
    .filter((attempt) => !cutoff || new Date(attempt.completedAt) >= cutoff)
    .sort((a, b) => b.score - a.score || new Date(b.completedAt) - new Date(a.completedAt));

  const leaderboard = attempts.map((attempt, index) => ({
    id: attempt.id,
    rank: index + 1,
    name: attempt.userName,
    avatar: scoreAvatar(attempt.score),
    score: attempt.score,
    topic: attempt.topic,
    difficulty: attempt.difficulty,
    timestamp: attempt.completedAt,
    correct: attempt.correctCount,
    total: attempt.totalQuestions
  }));

  res.json({ success: true, leaderboard });
});

const getCutoffDate = (timePeriod) => {
  const now = new Date();
  if (timePeriod === 'today') return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (timePeriod === 'week') return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  if (timePeriod === 'month') return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
  return null;
};

const scoreAvatar = (score) => {
  if (score >= 900) return '👑';
  if (score >= 700) return '🏆';
  if (score >= 500) return '⭐';
  return '🎮';
};
