import React from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import Button from '../ui/Button';

const HeroSection = ({ onGetStarted }) => {
    return (
        <section className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        AI Quiz Generator
                    </motion.h1>

                    <motion.p
                        className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Challenge yourself with AI-powered quizzes on Space, Coding, History, and Science.
                        Test your knowledge and climb the leaderboard!
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <Button
                            size="lg"
                            icon={<Rocket className="w-5 h-5" />}
                            onClick={onGetStarted}
                            className="text-lg"
                        >
                            Get Started
                        </Button>
                    </motion.div>

                    {/* Floating stats */}
                    <motion.div
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                    >
                        {[
                            { label: 'Topics', value: '4+' },
                            { label: 'Questions', value: '120+' },
                            { label: 'Difficulty Levels', value: '3' }
                        ].map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-6"
                                whileHover={{ scale: 1.05, borderColor: 'rgba(6, 182, 212, 0.5)' }}
                            >
                                <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                                <div className="text-white/70">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
