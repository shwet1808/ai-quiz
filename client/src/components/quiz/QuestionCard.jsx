import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, SkipForward } from 'lucide-react';
import { useQuiz } from '../../context/QuizContext';
import { useAudio } from '../../context/AudioContext';
import GlassCard from '../ui/GlassCard';
import Button from '../ui/Button';

const QuestionCard = ({ question, onAnswer, onSkip }) => {
    const { answers, currentQuestionIndex } = useQuiz();
    const { playSound } = useAudio();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);

    // Reset state when question changes
    useEffect(() => {
        setSelectedAnswer(null);
        setIsAnswered(false);
    }, [currentQuestionIndex]);

    const handleAnswerClick = (answerIndex) => {
        if (isAnswered) return;

        setSelectedAnswer(answerIndex);
        setIsAnswered(true);

        // Play sound based on correctness
        if (answerIndex === question.correctAnswer) {
            playSound('correct');
        } else {
            playSound('wrong');
        }

        // Submit answer
        onAnswer(answerIndex);

        // Auto-advance after 2 seconds
        setTimeout(() => {
            onAnswer(answerIndex, true); // true indicates auto-advance
        }, 2000);
    };

    const handleSkip = () => {
        if (isAnswered) return;
        onSkip();
    };

    const getOptionClass = (index) => {
        if (!isAnswered) {
            return 'border-border bg-background-secondary hover:border-accent hover:bg-background-tertiary cursor-pointer text-text';
        }

        if (index === question.correctAnswer) {
            return 'border-status-success bg-status-success/20';
        }

        if (index === selectedAnswer && index !== question.correctAnswer) {
            return 'border-status-error bg-status-error/20';
        }

        return 'border-border bg-background-secondary opacity-50';
    };

    const getOptionIcon = (index) => {
        if (!isAnswered) return null;

        if (index === question.correctAnswer) {
            return <Check className="w-6 h-6 text-status-success" />;
        }

        if (index === selectedAnswer && index !== question.correctAnswer) {
            return <X className="w-6 h-6 text-status-error" />;
        }

        return null;
    };

    return (
        <div className="max-w-5xl mx-auto px-4 w-full">
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Question */}
                    <GlassCard className="px-6 py-4 mb-4">
                        <h2 className="text-xl md:text-2xl font-bold text-text text-center mb-4 leading-tight">
                            {question.question}
                        </h2>

                        {/* Question Image (if exists) */}
                        {question.imageUrl && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-4"
                            >
                                <div className="relative w-full max-w-xl mx-auto rounded-xl overflow-hidden border border-border">
                                    <img
                                        src={question.imageUrl}
                                        alt="Question context"
                                        className="w-full h-auto max-h-56 md:max-h-72 object-contain bg-background-secondary"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.div>
                        )}
                    </GlassCard>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                        {question.options.map((option, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                                disabled={isAnswered}
                                className={`
                                    p-3 rounded-xl border-2 transition-all duration-300 text-left
                                    flex items-center justify-between gap-3
                                    ${getOptionClass(index)}
                                `}
                                whileHover={!isAnswered ? { scale: 1.01 } : {}}
                                whileTap={!isAnswered ? { scale: 0.99 } : {}}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0
                                        ${isAnswered && index === question.correctAnswer ? 'bg-status-success text-white' : ''}
                                        ${isAnswered && index === selectedAnswer && index !== question.correctAnswer ? 'bg-status-error text-white' : ''}
                                        ${!isAnswered ? 'bg-background-tertiary text-text' : ''}
                                    `}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className={`font-medium text-sm sm:text-base break-words leading-snug ${isAnswered ? 'text-text' : ''}`}>{option}</span>
                                </div>
                                <div className="flex-shrink-0">
                                    {getOptionIcon(index)}
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Explanation (shown after answer) */}
                    <AnimatePresence>
                        {isAnswered && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <GlassCard className="p-6 mb-6">
                                    <div className="flex items-start gap-3">
                                        <div className={`
                                            p-2 rounded-lg flex-shrink-0
                                            ${selectedAnswer === question.correctAnswer ? 'bg-status-success/20' : 'bg-status-warning/20'}
                                        `}>
                                            {selectedAnswer === question.correctAnswer ? '✅' : 'ℹ️'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-text mb-2">
                                                {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Explanation'}
                                            </h3>
                                            <p className="text-text-secondary">{question.explanation}</p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Skip Button */}
                    {!isAnswered && (
                        <div className="flex justify-center">
                            <Button
                                variant="ghost"
                                onClick={handleSkip}
                                icon={<SkipForward className="w-5 h-5" />}
                            >
                                Skip Question
                            </Button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default QuestionCard;
