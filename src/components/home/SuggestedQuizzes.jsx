import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Code, History, Atom } from 'lucide-react';
import GlassCard from '../ui/GlassCard';

const SuggestedQuizzes = ({ onQuizSelect }) => {
    const suggestedQuizzes = [
        {
            id: 1,
            title: 'React Hooks Mastery',
            topic: 'Coding',
            difficulty: 'Medium',
            icon: <Code className="w-8 h-8" />,
            color: 'from-blue-500 to-cyan-500',
            description: 'Test your knowledge of React Hooks'
        },
        {
            id: 2,
            title: 'Space Exploration',
            topic: 'Space',
            difficulty: 'Easy',
            icon: <Sparkles className="w-8 h-8" />,
            color: 'from-purple-500 to-pink-500',
            description: 'Journey through the cosmos'
        },
        {
            id: 3,
            title: 'World War II',
            topic: 'History',
            difficulty: 'Hard',
            icon: <History className="w-8 h-8" />,
            color: 'from-orange-500 to-red-500',
            description: 'Deep dive into WWII history'
        },
        {
            id: 4,
            title: 'Quantum Physics',
            topic: 'Science',
            difficulty: 'Hard',
            icon: <Atom className="w-8 h-8" />,
            color: 'from-green-500 to-emerald-500',
            description: 'Explore quantum mechanics'
        }
    ];

    return (
        <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 gradient-text">
                        Trending Quizzes
                    </h2>
                    <p className="text-center text-white/70 mb-12">
                        Click on any quiz to auto-fill the form above
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {suggestedQuizzes.map((quiz, index) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                            >
                                <GlassCard
                                    hover
                                    onClick={() => onQuizSelect(quiz.topic, quiz.difficulty)}
                                    className="p-6 h-full"
                                >
                                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${quiz.color} flex items-center justify-center mb-4`}>
                                        {quiz.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {quiz.title}
                                    </h3>

                                    <p className="text-white/60 text-sm mb-4">
                                        {quiz.description}
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-white">
                                            {quiz.topic}
                                        </span>
                                        <span className={`
                      px-3 py-1 rounded-full text-xs font-medium
                      ${quiz.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' : ''}
                      ${quiz.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${quiz.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' : ''}
                    `}>
                                            {quiz.difficulty}
                                        </span>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SuggestedQuizzes;
