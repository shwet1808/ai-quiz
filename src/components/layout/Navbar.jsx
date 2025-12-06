import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Menu, X, User } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useQuiz } from '../../context/QuizContext';

const Navbar = () => {
    const { isMuted, toggleMute } = useAudio();
    const { user } = useQuiz();
    const location = useLocation();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToTop = () => {
        setMobileMenuOpen(false);
        if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        }
    };

    const scrollToSection = (sectionId) => {
        setMobileMenuOpen(false);
        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const navLinks = [
        { label: 'Home', action: scrollToTop, type: 'button' },
        { label: 'About', action: () => scrollToSection('about'), type: 'button' },
        { label: 'Contact', action: () => scrollToSection('contact'), type: 'button' },
        { label: 'Leaderboard', path: '/leaderboard', type: 'link' },
    ];

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
                    <button onClick={scrollToTop} className="flex items-center gap-2 group z-50 cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Sparkles className="w-8 h-8 text-cyan-400" />
                        </motion.div>
                        <span className="text-xl font-bold gradient-text">AI QuizGen</span>
                    </button>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            link.type === 'link' ? (
                                <Link
                                    key={link.label}
                                    to={link.path}
                                    className="text-white/80 hover:text-white transition-colors font-medium"
                                >
                                    {link.label}
                                </Link>
                            ) : (
                                <button
                                    key={link.label}
                                    onClick={link.action}
                                    className="text-white/80 hover:text-white transition-colors font-medium"
                                >
                                    {link.label}
                                </button>
                            )
                        ))}
                    </div>

                    {/* Right side - User & Audio & Mobile Menu */}
                    <div className="flex items-center gap-3">
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
                            <Link to="/profile">
                                <motion.div
                                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span className="text-2xl">{user.avatar}</span>
                                    <span className="text-white font-medium">{user.name}</span>
                                </motion.div>
                            </Link>
                        )}

                        {/* Mobile User Icon */}
                        {user.name && (
                            <Link to="/profile" className="sm:hidden">
                                <motion.button
                                    className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <User className="w-5 h-5 text-white" />
                                </motion.button>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {mobileMenuOpen ? (
                                <X className="w-6 h-6 text-white" />
                            ) : (
                                <Menu className="w-6 h-6 text-white" />
                            )}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/10 backdrop-blur-xl bg-white/5"
                    >
                        <div className="px-4 py-4 space-y-2">
                            {navLinks.map((link, index) => (
                                <motion.div
                                    key={link.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {link.type === 'link' ? (
                                        <Link
                                            to={link.path}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={link.action}
                                            className="w-full text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                            {user.name && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: navLinks.length * 0.1 }}
                                >
                                    <Link
                                        to="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all font-medium"
                                    >
                                        Profile
                                    </Link>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
