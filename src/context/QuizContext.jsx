import React, { createContext, useContext, useState, useCallback } from 'react';
import { getQuestions } from '../data/mockQuestions';

const QuizContext = createContext();

// Helper function to shuffle array
const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
};

// Helper function to get avatar based on score
const getAvatarByScore = (score) => {
    if (score >= 900) return '👑';
    if (score >= 700) return '🏆';
    if (score >= 500) return '⭐';
    return '🎮';
};

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

    // Start quiz with mock data
    const startQuiz = useCallback((userName, topic, difficulty, inputMode = 'text') => {
        // Set user info
        setUser({
            name: userName,
            avatar: getAvatarByScore(0),
            totalScore: 0
        });

        // Set quiz configuration
        setQuizConfig({ topic, difficulty, inputMode });

        // Get questions based on topic and difficulty
        const quizQuestions = getQuestions(topic, difficulty);

        // Shuffle and select 10 questions
        const shuffledQuestions = shuffleArray([...quizQuestions]).slice(0, 10);

        setQuestions(shuffledQuestions);
        setCurrentQuestionIndex(0);
        setAnswers(new Array(10).fill(-1));
        setQuizStarted(true);
        setQuizCompleted(false);
        setScore(0);
    }, []);

    // Load quiz from AI-generated data
    const loadQuizFromAPI = useCallback((userName, quizData, topic, difficulty) => {
        // Set user info
        setUser({
            name: userName,
            avatar: getAvatarByScore(0),
            totalScore: 0
        });

        // Set quiz configuration
        setQuizConfig({ topic, difficulty, inputMode: 'file' });

        // Use AI-generated questions
        setQuestions(quizData.questions);
        setCurrentQuestionIndex(0);
        setAnswers(new Array(quizData.questions.length).fill(-1));
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
        loadQuizFromAPI,
        submitAnswer,
        skipQuestion,
        nextQuestion,
        resetQuiz,
        getCurrentQuestion,
        getProgress
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
