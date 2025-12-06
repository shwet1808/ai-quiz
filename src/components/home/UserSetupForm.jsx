import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, ChevronDown, X, CheckCircle } from 'lucide-react';
import { toast } from 'react-toastify';
import { useQuiz } from '../../context/QuizContext';
import { uploadPDF, uploadImage } from '../../services/apiService';
import Input from '../ui/Input';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { getTopics, getDifficulties } from '../../data/mockQuestions';

const UserSetupForm = () => {
    const navigate = useNavigate();
    const { startQuiz, loadQuizFromAPI } = useQuiz();

    const [formData, setFormData] = useState({
        name: '',
        topic: '',
        difficulty: '',
        inputMode: 'text',
        questionCount: 10
    });

    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [processingStatus, setProcessingStatus] = useState('');

    const topics = getTopics();
    const difficulties = getDifficulties();

    // Listen for auto-fill event from suggested quizzes
    useEffect(() => {
        const handleAutoFill = (event) => {
            const { topic, difficulty } = event.detail;
            setFormData(prev => ({
                ...prev,
                topic,
                difficulty
            }));
            toast.success(`Auto-filled: ${topic} - ${difficulty}`);
        };

        window.addEventListener('autoFillQuiz', handleAutoFill);
        return () => window.removeEventListener('autoFillQuiz', handleAutoFill);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleDifficultySelect = (difficulty) => {
        setFormData(prev => ({ ...prev, difficulty }));
        if (errors.difficulty) {
            setErrors(prev => ({ ...prev, difficulty: '' }));
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            await processFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = async (e) => {
        if (e.target.files && e.target.files[0]) {
            await processFile(e.target.files[0]);
        }
    };

    const processFile = async (file) => {
        // Validate file
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (file.size > maxSize) {
            toast.error('File size must be less than 10MB');
            return;
        }

        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            toast.error('Only PDF, JPG, PNG, and WebP files are allowed');
            return;
        }

        setUploadedFile(file);
        toast.success(`File "${file.name}" selected. Click "Generate Quiz" to process.`);
    };

    const removeFile = () => {
        setUploadedFile(null);
        toast.info('File removed');
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (formData.inputMode === 'text') {
            if (!formData.topic) {
                newErrors.topic = 'Please select a topic';
            }
            if (!formData.difficulty) {
                newErrors.difficulty = 'Please select a difficulty level';
            }
        } else {
            // File mode
            if (!uploadedFile) {
                newErrors.file = 'Please upload a file';
                toast.error('Please upload a PDF or image file');
            }
            if (!formData.difficulty) {
                newErrors.difficulty = 'Please select a difficulty level';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        // Text mode - use mock data
        if (formData.inputMode === 'text') {
            startQuiz(formData.name, formData.topic, formData.difficulty, 'text');
            navigate('/quiz');
            return;
        }

        // File mode - use AI generation
        setUploading(true);
        try {
            const isPDF = uploadedFile.type === 'application/pdf';

            if (isPDF) {
                setProcessingStatus('Extracting text from PDF...');
            } else {
                setProcessingStatus('Analyzing image...');
            }

            // Upload file and generate quiz
            const uploadFunction = isPDF ? uploadPDF : uploadImage;
            const result = await uploadFunction(
                uploadedFile,
                formData.difficulty,
                formData.questionCount
            );

            if (result.success) {
                setProcessingStatus('Quiz generated successfully!');
                toast.success(`Generated ${result.quiz.questions.length} questions!`);

                // Load quiz from API
                loadQuizFromAPI(
                    formData.name,
                    result.quiz,
                    result.quiz.questions[0]?.topic || 'AI Generated',
                    formData.difficulty
                );

                // Navigate to quiz
                setTimeout(() => {
                    navigate('/quiz');
                }, 500);
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error(error.message || 'Failed to generate quiz. Please try again.');
            setProcessingStatus('');
        } finally {
            setUploading(false);
        }
    };

    return (
        <section className="py-16 px-4" id="quiz-form">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
                        Start Your Quiz
                    </h2>
                    <p className="text-center text-white/70 mb-8">
                        Fill in your details and choose your preferences
                    </p>

                    <GlassCard className="p-6 sm:p-8">
                        {uploading ? (
                            <LoadingSpinner
                                message="Generating Quiz with AI"
                                subMessage={processingStatus}
                            />
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Input */}
                                <Input
                                    label="Your Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    required
                                    error={errors.name}
                                />

                                {/* Input Mode Toggle */}
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-3">
                                        Input Mode
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <motion.button
                                            type="button"
                                            onClick={() => {
                                                setFormData(prev => ({ ...prev, inputMode: 'text' }));
                                                setUploadedFile(null);
                                            }}
                                            className={`
                                                p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2
                                                ${formData.inputMode === 'text'
                                                    ? 'border-cyan-400 bg-cyan-400/20'
                                                    : 'border-white/20 bg-white/5 hover:border-white/40'
                                                }
                                            `}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <FileText className="w-5 h-5" />
                                            <span className="font-semibold">Text Input</span>
                                        </motion.button>

                                        <motion.button
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, inputMode: 'file' }))}
                                            className={`
                                                p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center gap-2
                                                ${formData.inputMode === 'file'
                                                    ? 'border-cyan-400 bg-cyan-400/20'
                                                    : 'border-white/20 bg-white/5 hover:border-white/40'
                                                }
                                            `}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Upload className="w-5 h-5" />
                                            <span className="font-semibold">AI Upload</span>
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Text Mode Fields */}
                                {formData.inputMode === 'text' && (
                                    <>
                                        {/* Topic Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-white/80 mb-2">
                                                Select Topic <span className="text-red-400">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="topic"
                                                    value={formData.topic}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20 text-white appearance-none focus:outline-none focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300 cursor-pointer"
                                                >
                                                    <option value="" className="bg-slate-800">Select a topic...</option>
                                                    {topics.map(topic => (
                                                        <option key={topic} value={topic} className="bg-slate-800">
                                                            {topic}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                                            </div>
                                            {errors.topic && (
                                                <p className="mt-1 text-sm text-red-400">{errors.topic}</p>
                                            )}
                                        </div>
                                    </>
                                )}

                                {/* File Upload Area (if file mode selected) */}
                                <AnimatePresence>
                                    {formData.inputMode === 'file' && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            {!uploadedFile ? (
                                                <div
                                                    className={`
                                                        relative border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-300
                                                        ${dragActive ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/30 bg-white/5'}
                                                    `}
                                                    onDragEnter={handleDrag}
                                                    onDragLeave={handleDrag}
                                                    onDragOver={handleDrag}
                                                    onDrop={handleDrop}
                                                >
                                                    <input
                                                        type="file"
                                                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                                                        onChange={handleFileChange}
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    />
                                                    <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                                                    <p className="text-white/80 mb-2 text-sm sm:text-base">
                                                        Drag & drop your file here, or click to browse
                                                    </p>
                                                    <p className="text-white/50 text-xs sm:text-sm">
                                                        Supports PDF, JPG, PNG, WebP (Max 10MB)
                                                    </p>
                                                    <p className="text-cyan-400 text-xs mt-2">
                                                        ✨ AI will analyze your file and generate quiz questions
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="p-4 rounded-xl bg-white/10 border border-white/20">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                            <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-white font-medium truncate">{uploadedFile.name}</p>
                                                                <p className="text-white/50 text-sm">
                                                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={removeFile}
                                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
                                                        >
                                                            <X className="w-5 h-5 text-white/70" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Difficulty Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-3">
                                        Difficulty Level <span className="text-red-400">*</span>
                                    </label>
                                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                                        {difficulties.map((diff) => (
                                            <motion.button
                                                key={diff}
                                                type="button"
                                                onClick={() => handleDifficultySelect(diff)}
                                                className={`
                                                    p-3 sm:p-4 rounded-xl border-2 transition-all duration-300
                                                    ${formData.difficulty === diff
                                                        ? 'border-cyan-400 bg-cyan-400/20'
                                                        : 'border-white/20 bg-white/5 hover:border-white/40'
                                                    }
                                                `}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="text-center">
                                                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                                                        {diff === 'Easy' ? '😊' : diff === 'Medium' ? '🤔' : '🔥'}
                                                    </div>
                                                    <div className="font-semibold text-white text-sm sm:text-base">{diff}</div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                    {errors.difficulty && (
                                        <p className="mt-1 text-sm text-red-400">{errors.difficulty}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    disabled={uploading}
                                >
                                    {formData.inputMode === 'file' ? 'Generate Quiz with AI' : 'Start Quiz'}
                                </Button>

                                {formData.inputMode === 'file' && (
                                    <p className="text-center text-white/50 text-sm">
                                        🤖 Powered by Google Gemini AI
                                    </p>
                                )}
                            </form>
                        )}
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};

export default UserSetupForm;
