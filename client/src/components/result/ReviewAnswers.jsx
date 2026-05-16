import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Filter } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const ReviewAnswers = ({ questions, answers }) => {
    const [filter, setFilter] = useState('all'); // 'all', 'correct', 'incorrect', 'skipped'

    const filteredQuestions = questions.map((q, idx) => ({
        ...q,
        index: idx,
        userAnswer: answers[idx],
        isCorrect: answers[idx] === q.correctAnswer,
        wasSkipped: answers[idx] === -1
    })).filter(q => {
        if (filter === 'correct') return q.isCorrect;
        if (filter === 'incorrect') return !q.isCorrect && !q.wasSkipped;
        if (filter === 'skipped') return q.wasSkipped;
        return true;
    });

    const stats = {
        total: questions.length,
        correct: questions.filter((q, idx) => answers[idx] === q.correctAnswer).length,
        incorrect: questions.filter((q, idx) => answers[idx] !== q.correctAnswer && answers[idx] !== -1).length,
        skipped: questions.filter((q, idx) => answers[idx] === -1).length
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold gradient-text mb-2">Review Your Answers</h2>
                <p className="text-text-secondary">Detailed breakdown of your quiz performance</p>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <GlassCard className="p-4 text-center">
                    <div className="text-2xl font-bold text-accent mb-1">{stats.total}</div>
                    <div className="text-xs text-text-muted">Total Questions</div>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                    <div className="text-2xl font-bold text-status-success mb-1">{stats.correct}</div>
                    <div className="text-xs text-text-muted">Correct</div>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                    <div className="text-2xl font-bold text-status-error mb-1">{stats.incorrect}</div>
                    <div className="text-xs text-text-muted">Incorrect</div>
                </GlassCard>
                <GlassCard className="p-4 text-center">
                    <div className="text-2xl font-bold text-text-muted mb-1">{stats.skipped}</div>
                    <div className="text-xs text-text-muted">Skipped</div>
                </GlassCard>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filter === 'all'
                            ? 'bg-accent text-white'
                            : 'bg-background-secondary border border-border text-text-secondary hover:border-accent'
                    }`}
                >
                    <Filter className="w-4 h-4 inline mr-2" />
                    All ({stats.total})
                </button>
                <button
                    onClick={() => setFilter('correct')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filter === 'correct'
                            ? 'bg-status-success text-white'
                            : 'bg-background-secondary border border-border text-text-secondary hover:border-status-success'
                    }`}
                >
                    <Check className="w-4 h-4 inline mr-2" />
                    Correct ({stats.correct})
                </button>
                <button
                    onClick={() => setFilter('incorrect')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filter === 'incorrect'
                            ? 'bg-status-error text-white'
                            : 'bg-background-secondary border border-border text-text-secondary hover:border-status-error'
                    }`}
                >
                    <X className="w-4 h-4 inline mr-2" />
                    Incorrect ({stats.incorrect})
                </button>
                <button
                    onClick={() => setFilter('skipped')}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        filter === 'skipped'
                            ? 'bg-text-muted text-white'
                            : 'bg-background-secondary border border-border text-text-secondary hover:border-text-muted'
                    }`}
                >
                    Skipped ({stats.skipped})
                </button>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
                <AnimatePresence mode="wait">
                    {filteredQuestions.map((question, displayIndex) => {
                        const userAnswer = question.userAnswer;
                        const isCorrect = question.isCorrect;
                        const wasSkipped = question.wasSkipped;
                        const index = question.index;

                        return (
                            <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: displayIndex * 0.1 }}
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
                </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredQuestions.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <p className="text-text-muted">No {filter} questions to display</p>
                </motion.div>
            )}
        </div>
    );
};

export default ReviewAnswers;
