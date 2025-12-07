import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useQuiz } from '../../context/QuizContext';
import ProgressBar from '../ui/ProgressBar';
import CircularTimer from '../ui/CircularTimer';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const QuizHeader = ({ timeLeft, totalTime }) => {
    const navigate = useNavigate();
    const { score, getProgress, resetQuiz } = useQuiz();
    const [showExitModal, setShowExitModal] = useState(false);

    const progress = getProgress();

    const handleBack = () => {
        setShowExitModal(true);
    };

    const confirmExit = () => {
        resetQuiz();
        navigate('/');
    };

    return (
        <>
            <motion.div
                className="sticky top-16 z-30 backdrop-blur-xl bg-background/90 border-b border-border py-3 shadow-lg"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="w-full px-4 sm:px-6">
                    <div className="flex items-center justify-between mb-2">
                        {/* Back Button */}
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-background-secondary hover:bg-background-tertiary transition-colors text-text"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Exit Quiz</span>
                        </button>

                        {/* Score */}
                        <div className="text-center">
                            <div className="text-sm text-text-secondary mb-1">Score</div>
                            <motion.div
                                className="text-xl font-bold gradient-text"
                                key={score}
                                initial={{ scale: 1.5 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {score}
                            </motion.div>
                        </div>

                        {/* Timer */}
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:block text-right">
                                <div className="text-sm text-text-secondary">Time Left</div>
                                <div className="text-lg font-semibold text-text">{timeLeft}s</div>
                            </div>
                            <CircularTimer timeLeft={timeLeft} totalTime={totalTime} />
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <ProgressBar progress={progress.percentage} showLabel={false} />
                    <div className="flex justify-between items-center mt-2 text-sm text-text-secondary">
                        <span>Question {progress.current} of {progress.total}</span>
                        <span>{progress.percentage.toFixed(0)}% Complete</span>
                    </div>
                </div>
            </motion.div>

            {/* Exit Confirmation Modal */}
            <Modal
                isOpen={showExitModal}
                onClose={() => setShowExitModal(false)}
                title="Exit Quiz?"
                footer={
                    <>
                        <Button variant="ghost" onClick={() => setShowExitModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={confirmExit}>
                            Exit
                        </Button>
                    </>
                }
            >
                <p className="text-text">
                    Are you sure you want to exit? Your progress will be lost.
                </p>
            </Modal>
        </>
    );
};

export default QuizHeader;
