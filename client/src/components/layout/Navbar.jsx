import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, Menu, X, User, Sun, Moon } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useQuiz } from '../../context/QuizContext';
import { useTheme } from '../../context/ThemeContext';

const Navbar = () => {
    const { isMuted, toggleMute } = useAudio();
    const { user } = useQuiz();
    const { theme, toggleTheme } = useTheme();
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
            className="fixed top-0 left-0 right-0 z-40 border-b border-border/70 bg-background-secondary/85 shadow-soft backdrop-blur-xl"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Brand button doubles as a reliable "return home" action from any route. */}
                    <button onClick={scrollToTop} className="flex items-center gap-2 group z-50 cursor-pointer">
                        <motion.div
                            whileHover={{ rotate: 180 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Sparkles className="w-8 h-8 text-accent" />
                        </motion.div>
                        <span className="text-xl font-bold gradient-text">AI QuizGen</span>
                    </button>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {navLinks.map((link, index) => (
                            link.type === 'button' ? (
                                <button
                                    key={index}
                                    onClick={link.action}
                                    className="text-text-secondary hover:text-text transition-colors"
                                >
                                    {link.label}
                                </button>
                            ) : (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className="text-text-secondary hover:text-text transition-colors"
                                >
                                    {link.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Right side controls */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-background-tertiary text-text-secondary hover:text-accent transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </motion.button>

                        {/* Audio Toggle */}
                        <motion.button
                            onClick={toggleMute}
                            className="p-2 rounded-lg hover:bg-background-tertiary text-text-secondary hover:text-accent transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            title={isMuted ? 'Unmute' : 'Mute'}
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </motion.button>

                        {/* User Profile */}
                        {user.name && (
                            <Link
                                to="/profile"
                                className="p-2 rounded-lg hover:bg-background-tertiary text-text-secondary hover:text-accent transition-colors"
                                title="Profile"
                            >
                                <User className="w-5 h-5" />
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu / Toggles Button */}
                    <div className="md:hidden flex items-center gap-2">
                        {/* Mobile Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-background-tertiary text-text-secondary hover:text-accent transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </motion.button>

                        {/* Mobile Audio Toggle */}
                        <motion.button
                            onClick={toggleMute}
                            className="p-2 rounded-lg hover:bg-background-tertiary text-text-secondary hover:text-accent transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 rounded-lg text-text-secondary hover:text-accent transition-colors"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
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
                        className="md:hidden border-t border-border bg-background"
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
                                            className="block px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-background-secondary transition-all font-medium"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={link.action}
                                            className="w-full text-left px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-background-secondary transition-all font-medium"
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
                                        className="block px-4 py-3 rounded-lg text-text-secondary hover:text-accent hover:bg-background-secondary transition-all font-medium"
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
