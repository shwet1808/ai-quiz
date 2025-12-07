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

        // Text mode
        if (formData.inputMode === 'text') {
            // Check if it's a standard mock topic
            const isMockTopic = topics.includes(formData.topic);

            if (isMockTopic) {
                // Use built-in mock questions
                startQuiz(formData.name, formData.topic, formData.difficulty, 'text');
                navigate('/quiz');
                return;
            } else {
                // Custom topic - Use AI Generation
                setUploading(true);
                setProcessingStatus(`Generating questions for "${formData.topic}"...`);

                try {
                    // Reuse the gemini service via the same API endpoint used for text uploads
                    // We'll create a synthetic "file" or just call a new method if we had one.
                    // Ideally we should have a clearer API for this. 
                    // For now, let's treat it as a text-based generation request.
                    // Since we don't have a direct "generate from topic" endpoint exposed in this component's imports yet,
                    // we might need to modify apiService.js or assume a new endpoint.

                    // Actually, we can reuse the uploadPDF logic but modify the backend? 
                    // No, cleaner to add a specific handler.
                    // For now, let's create a temporary text file with the topic prompt and upload it? 
                    // That's a hack.
                    // Better approach: Let's assume the backend 'uploadPDF' endpoint can also accept raw text or we add a new one.

                    // LET'S EDIT: We will call a new function `generateQuizFromTopic` which we will implement effectively by 
                    // calling the backend with a text payload.
                    // Since we don't have that yet, let's use a workaround:
                    // We will create a simple text file "topic.txt" containing the topic request and upload it as a "text" file
                    // if the backend supports it. The backend currently supports PDF.

                    // WAITING: I should probably update apiService.js first to support custom topic generation properly.
                    // But for this step, I'll implement the UI logic to call a function I will add next.

                    const { generateQuizFromTopic } = await import('../../services/apiService');

                    const result = await generateQuizFromTopic(
                        formData.topic,
                        formData.difficulty,
                        formData.questionCount
                    );

                    if (result.success) {
                        setProcessingStatus('Quiz generated successfully!');
                        toast.success(`Generated ${result.quiz.questions.length} questions for ${formData.topic}!`);

                        loadQuizFromAPI(
                            formData.name,
                            result.quiz,
                            formData.topic,
                            formData.difficulty
                        );

                        setTimeout(() => navigate('/quiz'), 500);
                    }
                } catch (error) {
                    console.error('Generation error:', error);
                    toast.error(error.message || 'Failed to generate quiz.');
                    setProcessingStatus('');
                } finally {
                    setUploading(false);
                }
                return;
            }
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
                    <p className="text-center text-text-secondary mb-8">
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
                                    <label className="block text-sm font-medium text-text-secondary mb-3">
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
                                                    ? 'border-accent bg-accent/20 text-accent'
                                                    : 'border-border bg-background-tertiary text-text-secondary hover:border-accent/50 hover:text-text'
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
                                                    ? 'border-accent bg-accent/20 text-accent'
                                                    : 'border-border bg-background-tertiary text-text-secondary hover:border-accent/50 hover:text-text'
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
                                            <label className="block text-sm font-medium text-text-secondary mb-2">
                                                Select Topic <span className="text-status-error">*</span>
                                            </label>
                                            <div className="relative">
                                                <select
                                                    name="topic"
                                                    value={topics.includes(formData.topic) ? formData.topic : 'Custom'}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === 'Custom') {
                                                            setFormData(prev => ({ ...prev, topic: '' }));
                                                        } else {
                                                            setFormData(prev => ({ ...prev, topic: value }));
                                                        }
                                                    }}
                                                    className="w-full px-4 py-3 rounded-xl input-field appearance-none cursor-pointer"
                                                >
                                                    <option value="" className="bg-background-secondary text-text" disabled>Select a topic...</option>
                                                    {topics.map(topic => (
                                                        <option key={topic} value={topic} className="bg-background-secondary text-text">
                                                            {topic}
                                                        </option>
                                                    ))}
                                                    <option value="Custom" className="bg-background-secondary font-semibold text-accent">✨ Custom Topic</option>
                                                </select>
                                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted pointer-events-none" />
                                            </div>
                                        </div>

                                        {/* Custom Topic Input */}
                                        <AnimatePresence>
                                            {(!topics.includes(formData.topic) || formData.topic === '') && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <Input
                                                        label="Enter Custom Topic"
                                                        name="topic"
                                                        value={formData.topic}
                                                        onChange={handleInputChange}
                                                        placeholder="E.g., Quantum Physics, 90s Pop Music, French Cuisine..."
                                                        required
                                                        error={errors.topic}
                                                        autoFocus
                                                    />
                                                </motion.div>
                                            )}
                                        </AnimatePresence>

                                        {/* Show error if standard topic selection is empty and not custom mode */}
                                        {errors.topic && topics.includes(formData.topic) && (
                                            <p className="mt-1 text-sm text-status-error">{errors.topic}</p>
                                        )}
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
                                                        ${dragActive ? 'border-accent bg-accent/10' : 'border-border bg-background-secondary'}
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
                                                    <Upload className="w-12 h-12 mx-auto mb-4 text-accent" />
                                                    <p className="text-text mb-2 text-sm sm:text-base">
                                                        Drag & drop your file here, or click to browse
                                                    </p>
                                                    <p className="text-text-muted text-xs sm:text-sm">
                                                        Supports PDF, JPG, PNG, WebP (Max 10MB)
                                                    </p>
                                                    <p className="text-accent text-xs mt-2">
                                                        ✨ AI will analyze your file and generate quiz questions
                                                    </p>
                                                </div>
                                            ) : (
                                                <div className="p-4 rounded-xl bg-background-secondary border border-border">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                            <CheckCircle className="w-6 h-6 text-status-success flex-shrink-0" />
                                                            <div className="min-w-0 flex-1">
                                                                <p className="text-text font-medium truncate">{uploadedFile.name}</p>
                                                                <p className="text-text-muted text-sm">
                                                                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={removeFile}
                                                            className="p-2 rounded-lg hover:bg-background-tertiary transition-colors flex-shrink-0"
                                                        >
                                                            <X className="w-5 h-5 text-text-secondary" />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Difficulty Selection */}
                                <div>
                                    <label className="block text-sm font-medium text-text-secondary mb-3">
                                        Difficulty Level <span className="text-status-error">*</span>
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
                                                        ? 'border-accent bg-accent/20'
                                                        : 'border-border bg-background-tertiary hover:border-accent/30'
                                                    }
                                                `}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="text-center">
                                                    <div className="text-xl sm:text-2xl mb-1 sm:mb-2">
                                                        {diff === 'Easy' ? '😊' : diff === 'Medium' ? '🤔' : '🔥'}
                                                    </div>
                                                    <div className={`font-semibold text-sm sm:text-base ${formData.difficulty === diff ? 'text-accent' : 'text-text'}`}>{diff}</div>
                                                </div>
                                            </motion.button>
                                        ))}
                                    </div>
                                    {errors.difficulty && (
                                        <p className="mt-1 text-sm text-status-error">{errors.difficulty}</p>
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
                                    <p className="text-center text-text-muted text-sm">
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
