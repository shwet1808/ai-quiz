import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const ReviewAnswers = ({ questions, answers }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold gradient-text mb-6">Review Your Answers</h2>

            {questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                const wasSkipped = userAnswer === -1;

                return (
                    <motion.div
                        key={question.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className="p-6">
                            {/* Question Header */}
                            <div className="flex items-start gap-3 mb-4">
                                <div className={`
                  p-2 rounded-lg flex-shrink-0
                  ${isCorrect ? 'bg-status-success/20' : wasSkipped ? 'bg-background-tertiary/20' : 'bg-status-error/20'}
                `}>
                                    {isCorrect ? (
                                        <Check className="w-5 h-5 text-status-success" />
                                    ) : wasSkipped ? (
                                        <span className="text-text-muted font-bold">—</span>
                                    ) : (
                                        <X className="w-5 h-5 text-status-error" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm text-text-secondary">Question {index + 1}</span>
                                        <span className={`
                      px-2 py-1 rounded-full text-xs font-medium
                      ${isCorrect ? 'bg-status-success/20 text-status-success' : ''}
                      ${wasSkipped ? 'bg-background-tertiary text-text-muted' : ''}
                      ${!isCorrect && !wasSkipped ? 'bg-status-error/20 text-status-error' : ''}
                    `}>
                                            {isCorrect ? 'Correct' : wasSkipped ? 'Skipped' : 'Incorrect'}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-text mb-4">
                                        {question.question}
                                    </h3>

                                    {/* Options */}
                                    <div className="space-y-2">
                                        {question.options.map((option, optIndex) => {
                                            const isUserAnswer = userAnswer === optIndex;
                                            const isCorrectAnswer = question.correctAnswer === optIndex;

                                            return (
                                                <div
                                                    key={optIndex}
                                                    className={`
                            p-3 rounded-lg border-2 transition-all
                            ${isCorrectAnswer ? 'border-status-success bg-status-success/10' : 'border-border bg-background-secondary'}
                            ${isUserAnswer && !isCorrectAnswer ? 'border-status-error bg-status-error/10' : ''}
                          `}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className={`
                                w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                                ${isCorrectAnswer ? 'bg-status-success text-white' : 'bg-background-tertiary text-text'}
                                ${isUserAnswer && !isCorrectAnswer ? 'bg-status-error text-white' : ''}
                              `}>
                                                                {String.fromCharCode(65 + optIndex)}
                                                            </span>
                                                            <span className="text-text">{option}</span>
                                                        </div>
                                                        {isCorrectAnswer && (
                                                            <Check className="w-5 h-5 text-status-success" />
                                                        )}
                                                        {isUserAnswer && !isCorrectAnswer && (
                                                            <X className="w-5 h-5 text-status-error" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation */}
                                    <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                                        <div className="flex items-start gap-2">
                                            <span className="text-accent text-lg">ℹ️</span>
                                            <div>
                                                <h4 className="font-semibold text-accent mb-1">Explanation</h4>
                                                <p className="text-text-secondary text-sm">{question.explanation}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ReviewAnswers;
