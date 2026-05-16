import React, { createContext, useContext, useState, useCallback } from 'react';
import { getQuestions } from '../data/mockQuestions';
import { generateQuizFromTopic, loginUser, submitQuiz as submitQuizResult } from '../services/apiService';

// The QuizContext is like a global brain for the quiz app. 
// It remembers things like: What question are we on? What is the user's score? 
// This way, we don't have to pass this information down through every single component.
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
    // User information is restored from localStorage so profile links survive page refreshes.
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('aiQuizUser');
        return savedUser ? JSON.parse(savedUser) : {
            name: '',
            avatar: '🎮',
            totalScore: 0
        };
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
    const [quizError, setQuizError] = useState('');
    const [isLoadingQuiz, setIsLoadingQuiz] = useState(false);

    // Keep React state and browser storage aligned whenever backend user data changes.
    const saveUser = useCallback((nextUser) => {
        setUser(nextUser);
        localStorage.setItem('aiQuizUser', JSON.stringify(nextUser));
    }, []);

    const startQuiz = useCallback(async (userName, topic, difficulty, inputMode = 'text', questionCount = 10) => {
        try {
            setIsLoadingQuiz(true);
            setQuizError('');
            
            const login = await loginUser(userName);
            saveUser(login.user);

            // Set quiz configuration
            setQuizConfig({ topic, difficulty, inputMode });

            // Always call API - no fallback to hardcoded questions
            const result = await generateQuizFromTopic(topic, difficulty, questionCount, userName);
            const apiQuestions = result.quiz?.questions || [];
            
            if (!apiQuestions || apiQuestions.length === 0) {
                throw new Error('No questions generated from API. Please try again.');
            }

            setQuestions(apiQuestions);
            setCurrentQuestionIndex(0);
            setAnswers(new Array(apiQuestions.length).fill(-1));
            setQuizStarted(true);
            setQuizCompleted(false);
            setScore(0);
            setIsLoadingQuiz(false);
            return result.quiz;
        } catch (error) {
            setIsLoadingQuiz(false);
            const errorMessage = error.message || 'Failed to generate quiz. Please check your connection and try again.';
            setQuizError(errorMessage);
            throw error;
        }
    }, [saveUser]);

    // Load a generated quiz into the exact state shape expected by the quiz screen.
    const loadQuizFromAPI = useCallback(async (userName, quizData, topic, difficulty) => {
        try {
            setIsLoadingQuiz(true);
            setQuizError('');
            
            const login = await loginUser(userName);
            saveUser(login.user);

            // Set quiz configuration
            setQuizConfig({ topic, difficulty, inputMode: 'file' });

            // Validate quiz data
            if (!quizData.questions || quizData.questions.length === 0) {
                throw new Error('Invalid quiz data. No questions found.');
            }

            // Use AI-generated questions
            setQuestions(quizData.questions);
            setCurrentQuestionIndex(0);
            setAnswers(new Array(quizData.questions.length).fill(-1));
            setQuizStarted(true);
            setQuizCompleted(false);
            setScore(0);
            setIsLoadingQuiz(false);
        } catch (error) {
            setIsLoadingQuiz(false);
            const errorMessage = error.message || 'Failed to load quiz. Please try again.';
            setQuizError(errorMessage);
            throw error;
        }
    }, [saveUser]);

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
        }
    }, [currentQuestionIndex, questions.length]);

    const submitQuiz = useCallback(async () => {
        // The backend recalculates score from questions and answers, so the browser never owns scoring truth.
        const result = await submitQuizResult({
            name: user.name,
            topic: quizConfig.topic,
            difficulty: quizConfig.difficulty,
            questions,
            answers
        });

        const nextUser = {
            ...user,
            totalScore: (user.totalScore || 0) + result.attempt.score,
            avatar: getAvatarByScore(result.attempt.score)
        };
        saveUser(nextUser);
        return result.attempt;
    }, [answers, questions, quizConfig, saveUser, user]);

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
        quizError,
        setQuizError,
        isLoadingQuiz,
        startQuiz,
        loadQuizFromAPI,
        submitAnswer,
        skipQuestion,
        nextQuestion,
        submitQuiz,
        resetQuiz,
        getCurrentQuestion,
        getProgress
    };

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
