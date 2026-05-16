import { updateDatabase, readDatabase } from './storageService.js';
import { validateName } from '../utils/validators.js';
import { randomUUID } from 'node:crypto';

const avatarForScore = (score = 0) => {
  if (score >= 900) return '👑';
  if (score >= 700) return '🏆';
  if (score >= 500) return '⭐';
  return '🎮';
};

export const findOrCreateUser = async (name) => {
  const normalized = validateName(name);
  let savedUser;

  await updateDatabase(async (db) => {
    // In this name-only app, login and registration are the same operation.
    const existing = db.users.find((user) => user.name.toLowerCase() === normalized.toLowerCase());
    if (existing) {
      existing.lastLoginAt = new Date().toISOString();
      savedUser = existing;
      return db;
    }

    savedUser = {
      id: randomUUID(),
      name: normalized,
      avatar: avatarForScore(0),
      totalScore: 0,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString()
    };
    db.users.push(savedUser);
    return db;
  });

  return savedUser;
};

export const getProfileForUser = async (name) => {
  const normalized = validateName(name);
  const db = await readDatabase();
  const user = db.users.find((entry) => entry.name.toLowerCase() === normalized.toLowerCase())
    || { id: randomUUID(), name: normalized, avatar: avatarForScore(0), totalScore: 0 };

  // Profile stats are derived from attempts so the JSON database stays easy to understand.
  const attempts = db.attempts
    .filter((attempt) => attempt.userName.toLowerCase() === normalized.toLowerCase())
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  const totalQuizzes = attempts.length;
  const totalScore = attempts.reduce((sum, attempt) => sum + attempt.score, 0);
  const totalCorrect = attempts.reduce((sum, attempt) => sum + attempt.correctCount, 0);
  const totalQuestions = attempts.reduce((sum, attempt) => sum + attempt.totalQuestions, 0);
  const bestScore = attempts.reduce((best, attempt) => Math.max(best, attempt.score), 0);
  const averageScore = totalQuizzes ? Math.round(totalScore / totalQuizzes) : 0;
  const accuracy = totalQuestions ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const sortedScores = [...db.attempts].sort((a, b) => b.score - a.score);
  const bestAttemptId = attempts.find((attempt) => attempt.score === bestScore)?.id;
  const rank = bestAttemptId ? sortedScores.findIndex((attempt) => attempt.id === bestAttemptId) + 1 : null;
  const level = Math.max(1, Math.floor(totalScore / 2000) + 1);
  const nextLevelXp = level * 2000;

  // Group attempts by topic for the profile's "Performance by Topic" cards.
  const topicMap = attempts.reduce((map, attempt) => {
    const current = map.get(attempt.topic) || { topic: attempt.topic, quizzes: 0, score: 0, bestScore: 0 };
    current.quizzes += 1;
    current.score += attempt.score;
    current.bestScore = Math.max(current.bestScore, attempt.score);
    map.set(attempt.topic, current);
    return map;
  }, new Map());

  const topicStats = Array.from(topicMap.values()).map((topic) => ({
    topic: topic.topic,
    quizzes: topic.quizzes,
    avgScore: Math.round(topic.score / topic.quizzes),
    bestScore: topic.bestScore
  }));

  return {
    user: {
      ...user,
      avatar: avatarForScore(bestScore),
      totalScore
    },
    stats: {
      totalQuizzes,
      totalScore,
      averageScore,
      bestScore,
      totalCorrect,
      totalQuestions,
      accuracy,
      rank,
      level,
      xp: totalScore,
      nextLevelXp,
      achievements: buildAchievements({ totalQuizzes, bestScore, accuracy }),
      recentQuizzes: attempts.slice(0, 5),
      topicStats
    }
  };
};

export const getHistoryForUser = async (name) => {
  const normalized = validateName(name);
  const db = await readDatabase();
  return db.attempts
    .filter((attempt) => attempt.userName.toLowerCase() === normalized.toLowerCase())
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
};

const buildAchievements = ({ totalQuizzes, bestScore, accuracy }) => [
  { id: 1, name: 'First Steps', icon: '🎯', description: 'Complete your first quiz', unlocked: totalQuizzes >= 1 },
  { id: 2, name: 'Perfect Score', icon: '💯', description: 'Get 100% on a quiz', unlocked: bestScore >= 1000 },
  { id: 3, name: 'Sharp Shooter', icon: '⚡', description: 'Reach 80% lifetime accuracy', unlocked: accuracy >= 80 },
  { id: 4, name: 'Knowledge Seeker', icon: '📚', description: 'Complete 10 quizzes', unlocked: totalQuizzes >= 10 },
  { id: 5, name: 'Master Mind', icon: '🧠', description: 'Complete 25 quizzes', unlocked: totalQuizzes >= 25 }
];
