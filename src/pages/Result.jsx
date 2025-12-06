import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, List, Award } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';
import { useAudio } from '../context/AudioContext';
import { calculateScore, calculateCoins, getPerformanceMessage } from '../utils/helpers';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import ReviewAnswers from '../components/result/ReviewAnswers';

const Result = () => {
    const navigate = useNavigate();
    const { questions, answers, score, user, quizConfig, resetQuiz } = useQuiz();
    const { playSound } = useAudio();
    const [showReview, setShowReview] = useState(false);
    const [animatedScore, setAnimatedScore] = useState(0);

    const scoreData = calculateScore(answers, questions);
    const coins = calculateCoins(score, quizConfig.difficulty);
    const performanceMessage = getPerformanceMessage(scoreData.percentage);

    // Confetti effect
    useEffect(() => {
        if (!questions.length) {
            navigate('/');
            return;
        }

        playSound('success');

        // Trigger confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
            });
            confetti({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#06b6d4', '#3b82f6', '#8b5cf6']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };

        frame();
    }, [navigate, questions, playSound]);

    // Animate score counter
    useEffect(() => {
        let start = 0;
        const end = score;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setAnimatedScore(end);
                clearInterval(timer);
            } else {
                setAnimatedScore(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [score]);

    const handlePlayAgain = () => {
        resetQuiz();
        navigate('/');
    };

    const handleViewLeaderboard = () => {
        navigate('/leaderboard');
    };

    if (!questions.length) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen py-20 px-4"
        >
            <div className="max-w-4xl mx-auto">
                {/* Main Result Card */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <GlassCard className="p-8 md:p-12 text-center mb-8">
                        {/* Trophy Icon */}
                        <motion.div
                            className="inline-block mb-6"
                            animate={{
                                rotate: [0, -10, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.5
                            }}
                        >
                            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                                <Trophy className="w-12 h-12 text-white" />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
                            Quiz Complete!
                        </h1>

                        <p className="text-xl text-white/80 mb-8">
                            {performanceMessage}
                        </p>

                        {/* Score Display */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6">
                                <div className="text-4xl font-bold text-cyan-400 mb-2">
                                    {animatedScore}
                                </div>
                                <div className="text-white/70">Total Score</div>
                            </div>

                            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6">
                                <div className="text-4xl font-bold text-green-400 mb-2">
                                    {scoreData.correct}/{scoreData.total}
                                </div>
                                <div className="text-white/70">Correct Answers</div>
                            </div>

                            <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6">
                                <div className="text-4xl font-bold text-purple-400 mb-2">
                                    {scoreData.percentage}%
                                </div>
                                <div className="text-white/70">Accuracy</div>
                            </div>
                        </div>

                        {/* Coins Earned */}
                        <motion.div
                            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: 'spring' }}
                        >
                            <Award className="w-6 h-6" />
                            <span className="text-lg font-bold">+{coins} Coins Earned!</span>
                        </motion.div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center">
                            <Button
                                onClick={() => setShowReview(!showReview)}
                                variant="secondary"
                                icon={<List className="w-5 h-5" />}
                            >
                                {showReview ? 'Hide' : 'Review'} Answers
                            </Button>

                            <Button
                                onClick={handleViewLeaderboard}
                                icon={<Trophy className="w-5 h-5" />}
                            >
                                View Leaderboard
                            </Button>

                            <Button
                                onClick={handlePlayAgain}
                                variant="ghost"
                                icon={<RotateCcw className="w-5 h-5" />}
                            >
                                Play Again
                            </Button>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Review Answers Section */}
                {showReview && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ReviewAnswers questions={questions} answers={answers} />
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default Result;
