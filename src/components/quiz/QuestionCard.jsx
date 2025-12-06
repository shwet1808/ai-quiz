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
            return 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10 cursor-pointer';
        }

        if (index === question.correctAnswer) {
            return 'border-green-400 bg-green-400/20';
        }

        if (index === selectedAnswer && index !== question.correctAnswer) {
            return 'border-red-400 bg-red-400/20';
        }

        return 'border-white/10 bg-white/5 opacity-50';
    };

    const getOptionIcon = (index) => {
        if (!isAnswered) return null;

        if (index === question.correctAnswer) {
            return <Check className="w-6 h-6 text-green-400" />;
        }

        if (index === selectedAnswer && index !== question.correctAnswer) {
            return <X className="w-6 h-6 text-red-400" />;
        }

        return null;
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
                <motion.div
                    key={question.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Question */}
                    <GlassCard className="p-8 mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                            {question.question}
                        </h2>
                    </GlassCard>

                    {/* Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        {question.options.map((option, index) => (
                            <motion.button
                                key={index}
                                onClick={() => handleAnswerClick(index)}
                                disabled={isAnswered}
                                className={`
                  p-6 rounded-xl border-2 transition-all duration-300 text-left
                  flex items-center justify-between gap-4
                  ${getOptionClass(index)}
                `}
                                whileHover={!isAnswered ? { scale: 1.02 } : {}}
                                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                    ${isAnswered && index === question.correctAnswer ? 'bg-green-400 text-white' : ''}
                    ${isAnswered && index === selectedAnswer && index !== question.correctAnswer ? 'bg-red-400 text-white' : ''}
                    ${!isAnswered ? 'bg-white/10 text-white' : ''}
                  `}>
                                        {String.fromCharCode(65 + index)}
                                    </div>
                                    <span className="text-white font-medium text-lg">{option}</span>
                                </div>
                                {getOptionIcon(index)}
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
                      ${selectedAnswer === question.correctAnswer ? 'bg-green-400/20' : 'bg-blue-400/20'}
                    `}>
                                            {selectedAnswer === question.correctAnswer ? '✅' : 'ℹ️'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white mb-2">
                                                {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Explanation'}
                                            </h3>
                                            <p className="text-white/80">{question.explanation}</p>
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
