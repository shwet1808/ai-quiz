import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Trophy,
    Target,
    TrendingUp,
    Award,
    Calendar,
    Clock,
    Star,
    Zap,
    Brain
} from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';

const Profile = () => {
    const navigate = useNavigate();
    const { user, quizConfig } = useQuiz();

    // Mock user stats - in a real app, this would come from a database
    const [userStats] = useState({
        totalQuizzes: 24,
        totalScore: 18750,
        averageScore: 781,
        bestScore: 950,
        totalCorrect: 187,
        totalQuestions: 240,
        accuracy: 78,
        streak: 5,
        rank: 12,
        level: 8,
        xp: 18750,
        nextLevelXp: 20000,
        achievements: [
            { id: 1, name: "First Steps", icon: "🎯", description: "Complete your first quiz", unlocked: true },
            { id: 2, name: "Perfect Score", icon: "💯", description: "Get 100% on a quiz", unlocked: true },
            { id: 3, name: "Speed Demon", icon: "⚡", description: "Answer all questions in under 2 minutes", unlocked: true },
            { id: 4, name: "Knowledge Seeker", icon: "📚", description: "Complete 10 quizzes", unlocked: true },
            { id: 5, name: "Master Mind", icon: "🧠", description: "Complete 25 quizzes", unlocked: false },
            { id: 6, name: "Unstoppable", icon: "🔥", description: "5-day streak", unlocked: true },
        ],
        recentQuizzes: [
            { id: 1, topic: "Space", difficulty: "Hard", score: 900, date: "2025-12-06", correct: 9, total: 10 },
            { id: 2, topic: "Coding", difficulty: "Medium", score: 700, date: "2025-12-05", correct: 7, total: 10 },
            { id: 3, topic: "Science", difficulty: "Easy", score: 800, date: "2025-12-05", correct: 8, total: 10 },
            { id: 4, topic: "History", difficulty: "Hard", score: 600, date: "2025-12-04", correct: 6, total: 10 },
            { id: 5, topic: "Space", difficulty: "Medium", score: 750, date: "2025-12-04", correct: 7, total: 10 },
        ],
        topicStats: [
            { topic: "Space", quizzes: 8, avgScore: 825, bestScore: 950 },
            { topic: "Coding", quizzes: 7, avgScore: 757, bestScore: 900 },
            { topic: "Science", quizzes: 5, avgScore: 780, bestScore: 850 },
            { topic: "History", quizzes: 4, avgScore: 700, bestScore: 800 },
        ]
    });

    const levelProgress = (userStats.xp / userStats.nextLevelXp) * 100;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-20 px-4"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/')}
                        icon={<ArrowLeft className="w-5 h-5" />}
                    >
                        Back to Home
                    </Button>
                </div>

                {/* Profile Header */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mb-8"
                >
                    <GlassCard className="p-8">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            {/* Animated Avatar */}
                            <motion.div
                                className="relative"
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                    scale: [1, 1.05, 1]
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-1">
                                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-6xl">
                                        {user.avatar || "🎮"}
                                    </div>
                                </div>
                                {/* Level Badge */}
                                <motion.div
                                    className="absolute -bottom-2 -right-2 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center font-bold text-white shadow-lg"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {userStats.level}
                                </motion.div>
                            </motion.div>

                            {/* User Info */}
                            <div className="flex-1 text-center md:text-left">
                                <h1 className="text-4xl font-bold gradient-text mb-2">
                                    {user.name || "Guest User"}
                                </h1>
                                <p className="text-white/70 mb-4">Quiz Master • Level {userStats.level}</p>

                                {/* Level Progress */}
                                <div className="mb-4">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm text-white/70">Level Progress</span>
                                        <span className="text-sm font-semibold text-cyan-400">
                                            {userStats.xp} / {userStats.nextLevelXp} XP
                                        </span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${levelProgress}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                        />
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
                                        <Trophy className="w-5 h-5 text-yellow-400" />
                                        <span className="text-white font-semibold">Rank #{userStats.rank}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
                                        <Zap className="w-5 h-5 text-orange-400" />
                                        <span className="text-white font-semibold">{userStats.streak} Day Streak</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5">
                                        <Target className="w-5 h-5 text-green-400" />
                                        <span className="text-white font-semibold">{userStats.accuracy}% Accuracy</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { label: "Total Quizzes", value: userStats.totalQuizzes, icon: Brain, color: "from-cyan-500 to-blue-600" },
                        { label: "Best Score", value: userStats.bestScore, icon: Star, color: "from-yellow-500 to-orange-600" },
                        { label: "Avg Score", value: userStats.averageScore, icon: TrendingUp, color: "from-green-500 to-emerald-600" },
                        { label: "Total Score", value: userStats.totalScore.toLocaleString(), icon: Award, color: "from-purple-500 to-pink-600" },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <GlassCard className="p-6" hover>
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                                <div className="text-white/70 text-sm">{stat.label}</div>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Quizzes */}
                    <div className="lg:col-span-2">
                        <GlassCard className="p-6">
                            <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
                                <Clock className="w-6 h-6" />
                                Recent Quizzes
                            </h2>
                            <div className="space-y-3">
                                {userStats.recentQuizzes.map((quiz, index) => (
                                    <motion.div
                                        key={quiz.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="font-bold text-white">{quiz.topic}</span>
                                                    <span className={`
                            px-2 py-1 rounded-full text-xs font-medium
                            ${quiz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : ''}
                            ${quiz.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                            ${quiz.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : ''}
                          `}>
                                                        {quiz.difficulty}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-white/60">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="w-4 h-4" />
                                                        {quiz.date}
                                                    </span>
                                                    <span>{quiz.correct}/{quiz.total} Correct</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-2xl font-bold gradient-text">{quiz.score}</div>
                                                <div className="text-xs text-white/50">points</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>

                    {/* Achievements */}
                    <div>
                        <GlassCard className="p-6">
                            <h2 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2">
                                <Award className="w-6 h-6" />
                                Achievements
                            </h2>
                            <div className="space-y-3">
                                {userStats.achievements.map((achievement, index) => (
                                    <motion.div
                                        key={achievement.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`
                      p-4 rounded-xl transition-all
                      ${achievement.unlocked
                                                ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30'
                                                : 'bg-white/5 opacity-50'
                                            }
                    `}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="text-3xl">{achievement.icon}</div>
                                            <div className="flex-1">
                                                <div className="font-bold text-white mb-1">{achievement.name}</div>
                                                <div className="text-xs text-white/60">{achievement.description}</div>
                                            </div>
                                            {achievement.unlocked && (
                                                <div className="text-green-400">✓</div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </div>
                </div>

                {/* Topic Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-6"
                >
                    <GlassCard className="p-6">
                        <h2 className="text-2xl font-bold gradient-text mb-6">Performance by Topic</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {userStats.topicStats.map((topic, index) => (
                                <div key={topic.topic} className="p-4 rounded-xl bg-white/5">
                                    <div className="text-lg font-bold text-white mb-3">{topic.topic}</div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-white/60">Quizzes:</span>
                                            <span className="text-white font-semibold">{topic.quizzes}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/60">Avg Score:</span>
                                            <span className="text-cyan-400 font-semibold">{topic.avgScore}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-white/60">Best:</span>
                                            <span className="text-yellow-400 font-semibold">{topic.bestScore}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Profile;
