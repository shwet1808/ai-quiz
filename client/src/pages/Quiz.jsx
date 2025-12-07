import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';
import { useTimer } from '../hooks/useTimer';
import LoadingOverlay from '../components/quiz/LoadingOverlay';
import CountdownOverlay from '../components/quiz/CountdownOverlay';
import QuizHeader from '../components/quiz/QuizHeader';
import QuestionCard from '../components/quiz/QuestionCard';

const Quiz = () => {
    const navigate = useNavigate();
    const {
        questions,
        getCurrentQuestion,
        submitAnswer,
        skipQuestion,
        nextQuestion,
        quizStarted,
        currentQuestionIndex
    } = useQuiz();

    const [isLoading, setIsLoading] = useState(true);
    const [showCountdown, setShowCountdown] = useState(false);
    const [quizActive, setQuizActive] = useState(false);

    const currentQuestion = getCurrentQuestion();

    // Timer hook
    const { timeLeft, restart: restartTimer } = useTimer(
        15,
        () => {
            // Time's up - auto skip
            handleSkip();
        },
        false
    );

    // Initial loading
    useEffect(() => {
        if (!quizStarted || questions.length === 0) {
            navigate('/');
            return;
        }

        // Simulate AI quiz generation
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
            setShowCountdown(true);
        }, 2000);

        return () => clearTimeout(loadingTimer);
    }, [quizStarted, questions, navigate]);

    // Handle countdown complete
    const handleCountdownComplete = () => {
        setShowCountdown(false);
        setQuizActive(true);
        restartTimer();
    };

    // Reset timer when question changes
    useEffect(() => {
        if (quizActive && currentQuestion) {
            restartTimer();
        }
    }, [currentQuestionIndex, quizActive, currentQuestion, restartTimer]);

    // Handle answer submission
    const handleAnswer = (answerIndex, autoAdvance = false) => {
        if (autoAdvance) {
            submitAnswer(answerIndex);

            // Check if quiz is complete
            if (currentQuestionIndex === questions.length - 1) {
                // Quiz completed
                setTimeout(() => {
                    navigate('/result');
                }, 500);
            } else {
                // Move to next question
                nextQuestion();
            }
        }
    };

    // Handle skip
    const handleSkip = () => {
        skipQuestion();

        // Check if quiz is complete
        if (currentQuestionIndex === questions.length - 1) {
            navigate('/result');
        } else {
            nextQuestion();
        }
    };

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (showCountdown) {
        return <CountdownOverlay onComplete={handleCountdownComplete} />;
    }

    if (!currentQuestion) {
        return null;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[calc(100vh-4rem)] flex flex-col"
        >
            <QuizHeader timeLeft={timeLeft} totalTime={15} />

            <div className="flex-1 flex flex-col justify-center py-4 sm:py-8 pb-32">
                <AnimatePresence mode="wait">
                    <QuestionCard
                        key={currentQuestion.id}
                        question={currentQuestion}
                        onAnswer={handleAnswer}
                        onSkip={handleSkip}
                    />
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default Quiz;
