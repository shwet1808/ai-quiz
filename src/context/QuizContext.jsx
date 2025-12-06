import React, { createContext, useContext, useState, useCallback } from 'react';
import { getQuestions } from '../data/mockQuestions';

const QuizContext = createContext();

export const useQuiz = () => {
    const context = useContext(QuizContext);
    if (!context) {
        throw new Error('useQuiz must be used within QuizProvider');
    }
    return context;
};

export const QuizProvider = ({ children }) => {
    // User information
    const [user, setUser] = useState({
        name: '',
        avatar: '🎮',
        totalScore: 0
    });

    // Quiz configuration
    const [quizConfig, setQuizConfig] = useState({
        topic: '',
        difficulty: '',
        inputMode: 'text' // 'text' or 'file'
    });

    // Quiz state
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);

    // Start quiz
    const startQuiz = useCallback((userName, topic, difficulty, inputMode = 'text') => {
        const quizQuestions = getQuestions(topic, difficulty, 10);

        setUser(prev => ({ ...prev, name: userName }));
        setQuizConfig({ topic, difficulty, inputMode });
        setQuestions(quizQuestions);
        setCurrentQuestionIndex(0);
        setAnswers(new Array(quizQuestions.length).fill(null));
        setQuizStarted(true);
        setQuizCompleted(false);
        setScore(0);
    }, []);

    // Submit answer
    const submitAnswer = useCallback((answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = answerIndex;
        setAnswers(newAnswers);

        // Check if answer is correct and update score
        if (answerIndex === questions[currentQuestionIndex].correctAnswer) {
            setScore(prev => prev + 100);
        }
    }, [currentQuestionIndex, answers, questions]);

    // Skip question
    const skipQuestion = useCallback(() => {
        const newAnswers = [...answers];
        newAnswers[currentQuestionIndex] = -1; // -1 indicates skipped
        setAnswers(newAnswers);
    }, [currentQuestionIndex, answers]);

    // Move to next question
    const nextQuestion = useCallback(() => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Quiz completed
            setQuizCompleted(true);
            setUser(prev => ({ ...prev, totalScore: prev.totalScore + score }));
        }
    }, [currentQuestionIndex, questions.length, score]);

    // Reset quiz
    const resetQuiz = useCallback(() => {
        setQuestions([]);
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setQuizStarted(false);
        setQuizCompleted(false);
        setScore(0);
        setQuizConfig({ topic: '', difficulty: '', inputMode: 'text' });
    }, []);

    // Get current question
    const getCurrentQuestion = useCallback(() => {
        return questions[currentQuestionIndex] || null;
    }, [questions, currentQuestionIndex]);

    // Get quiz progress
    const getProgress = useCallback(() => {
        return {
            current: currentQuestionIndex + 1,
            total: questions.length,
            percentage: questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
        };
    }, [currentQuestionIndex, questions.length]);

    const value = {
        user,
        setUser,
        quizConfig,
        setQuizConfig,
        questions,
        currentQuestionIndex,
        answers,
        quizStarted,
        quizCompleted,
        score,
        startQuiz,
        submitAnswer,
        skipQuestion,
        nextQuestion,
        resetQuiz,
        getCurrentQuestion,
        getProgress
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
