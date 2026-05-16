import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock3, LineChart, Rocket, Sparkles } from 'lucide-react';
import Button from '../ui/Button';

// HeroSection component: Displays the main landing section of the app
const HeroSection = ({ onGetStarted }) => {
    return (
        <section className="px-4 py-12 sm:py-16 lg:py-20">
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                {/* Left section: Text content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-left"
                >
                    {/* Highlighted badge */}
                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                        <Sparkles className="h-4 w-4" />
                        AI-ready quizzes with local fallback
                    </div>

                    {/* Main heading */}
                    <motion.h1
                        className="mb-6 text-4xl font-black leading-tight tracking-normal text-text sm:text-5xl lg:text-6xl"
                        animate={{
                            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                    >
                        Build sharper recall with <span className="gradient-text">adaptive quizzes</span>
                    </motion.h1>

                    {/* Supporting text */}
                    <motion.p
                        className="mx-auto mb-8 max-w-2xl text-lg leading-8 text-text-secondary lg:mx-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Generate a quiz by topic, race the timer, review explanations, and track your progress on a real leaderboard.
                    </motion.p>

                    {/* Call-to-action buttons */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
                    >
                        <Button
                            size="lg"
                            icon={<Rocket className="w-5 h-5" />}
                            onClick={onGetStarted}
                            className="w-full text-lg sm:w-auto"
                        >
                            Get Started
                        </Button>
                        <div className="text-sm font-medium text-text-muted">
                            No API key required to try it locally
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right section: Preview card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="glass-card p-5 sm:p-6"
                >
                    {/* Preview card content */}
                    <div className="mb-5 flex items-center justify-between border-b border-border pb-4">
                        <div>
                            <p className="text-sm font-semibold text-accent">Live Quiz Preview</p>
                            <h2 className="text-xl font-bold text-text">React Fundamentals</h2>
                        </div>
                        <div className="rounded-lg bg-status-success/15 px-3 py-1 text-sm font-bold text-status-success">
                            Medium
                        </div>
                    </div>

                    <div className="rounded-lg border border-border bg-background-tertiary p-4">
                        <p className="mb-4 text-base font-semibold text-text">
                            Which hook is used to store component state?
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
