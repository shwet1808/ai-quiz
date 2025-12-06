import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Trophy, Users } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const AboutSection = () => {
    const features = [
        {
            icon: <Brain className="w-8 h-8" />,
            title: 'AI-Powered',
            description: 'Our advanced algorithms generate challenging questions tailored to your skill level'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Instant Feedback',
            description: 'Get immediate results and detailed explanations for every question'
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: 'Leaderboard',
            description: 'Compete with others and climb the ranks to become the ultimate quiz master'
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Multiple Topics',
            description: 'Choose from Space, Coding, History, and Science with varying difficulty levels'
        }
    ];

    return (
        <section id="about" className="py-20 px-4 scroll-mt-20">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
                        How It Works
                    </h2>
                    <p className="text-center text-white/70 mb-12 max-w-2xl mx-auto">
                        Our AI-powered quiz generator creates personalized quizzes based on your preferences.
                        Choose your topic, select difficulty, and start learning!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <GlassCard className="p-6 h-full" hover>
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex-shrink-0">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-white/70">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* How it works steps */}
                    <GlassCard className="p-8">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">
                            Get Started in 3 Simple Steps
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { step: '1', title: 'Choose Topic', desc: 'Select from 4 exciting categories' },
                                { step: '2', title: 'Set Difficulty', desc: 'Pick Easy, Medium, or Hard' },
                                { step: '3', title: 'Start Quiz', desc: 'Answer 10 questions and see your score' }
                            ].map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                >
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        {item.step}
                                    </div>
                                    <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
