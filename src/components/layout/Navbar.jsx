import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useQuiz } from '../../context/QuizContext';

const Navbar = () => {
    const { isMuted, toggleMute } = useAudio();
    const { user } = useQuiz();
    const location = useLocation();

    const scrollToSection = (sectionId) => {
        if (location.pathname !== '/') {
            window.location.href = `/#${sectionId}`;
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-white/5 border-b border-white/10"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Sparkles className="w-8 h-8 text-cyan-400" />
                        </motion.div>
                        <span className="text-xl font-bold gradient-text">AI QuizGen</span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-white/80 hover:text-white transition-colors font-medium"
                        >
                            Home
                        </Link>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-white/80 hover:text-white transition-colors font-medium"
                        >
                            About
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-white/80 hover:text-white transition-colors font-medium"
                        >
                            Contact
                        </button>
                    </div>

                    {/* Right side - User & Audio */}
                    <div className="flex items-center gap-4">
                        {/* Audio Toggle */}
                        <motion.button
                            onClick={toggleMute}
                            className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMuted ? (
                                <VolumeX className="w-5 h-5 text-white" />
                            ) : (
                                <Volume2 className="w-5 h-5 text-cyan-400" />
                            )}
                        </motion.button>

                        {/* User Profile */}
                        {user.name && (
                            <motion.div
                                className="flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-xl bg-white/10"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                <span className="text-2xl">{user.avatar}</span>
                                <span className="text-white font-medium hidden sm:block">{user.name}</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
