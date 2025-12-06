import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, FileText, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { useQuiz } from '../../context/QuizContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import GlassCard from '../ui/GlassCard';
import { getTopics, getDifficulties } from '../../data/mockQuestions';

const UserSetupForm = () => {
    const navigate = useNavigate();
    const { startQuiz } = useQuiz();

    const [formData, setFormData] = useState({
        name: '',
        topic: '',
        difficulty: '',
        inputMode: 'text'
    });

    const [errors, setErrors] = useState({});
    const [dragActive, setDragActive] = useState(false);

    const topics = getTopics();
    const difficulties = getDifficulties();

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

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            toast.info('File upload is a UI feature. Quiz will be generated from our database.');
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            toast.info('File upload is a UI feature. Quiz will be generated from our database.');
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.topic) {
            newErrors.topic = 'Please select a topic';
        }

        if (!formData.difficulty) {
            newErrors.difficulty = 'Please select a difficulty level';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            startQuiz(formData.name, formData.topic, formData.difficulty, formData.inputMode);
            navigate('/quiz');
        }
    };

    return (
        <section className="py-16 px-4">
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

                    <GlassCard className="p-8">
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

                            {/* Difficulty Selection */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-3">
                                    Difficulty Level <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-3 gap-4">
                                    {difficulties.map((diff) => (
                                        <motion.button
                                            key={diff}
                                            type="button"
                                            onClick={() => handleDifficultySelect(diff)}
                                            className={`
                        p-4 rounded-xl border-2 transition-all duration-300
                        ${formData.difficulty === diff
                                                    ? 'border-cyan-400 bg-cyan-400/20'
                                                    : 'border-white/20 bg-white/5 hover:border-white/40'
                                                }
                      `}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <div className="text-center">
                                                <div className="text-2xl mb-2">
                                                    {diff === 'Easy' ? '😊' : diff === 'Medium' ? '🤔' : '🔥'}
                                                </div>
                                                <div className="font-semibold text-white">{diff}</div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </div>
                                {errors.difficulty && (
                                    <p className="mt-1 text-sm text-red-400">{errors.difficulty}</p>
                                )}
                            </div>

                            {/* Input Mode Toggle */}
                            <div>
                                <label className="block text-sm font-medium text-white/80 mb-3">
                                    Input Mode
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, inputMode: 'text' }))}
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
                                        <span className="font-semibold">File Upload</span>
                                    </motion.button>
                                </div>
                            </div>

                            {/* File Upload Area (if file mode selected) */}
                            {formData.inputMode === 'file' && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div
                                        className={`
                      relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300
                      ${dragActive ? 'border-cyan-400 bg-cyan-400/10' : 'border-white/30 bg-white/5'}
                    `}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <input
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
                                        <p className="text-white/80 mb-2">
                                            Drag & drop your file here, or click to browse
                                        </p>
                                        <p className="text-white/50 text-sm">
                                            Supports PDF, JPG, PNG (UI feature only)
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full"
                            >
                                Start Quiz
                            </Button>
                        </form>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};

export default UserSetupForm;
