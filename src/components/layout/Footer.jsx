import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 border-t border-white/10 backdrop-blur-xl bg-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold gradient-text mb-3">AI QuizGen</h3>
                        <p className="text-white/60 text-sm">
                            Challenge yourself with AI-generated quizzes on various topics.
                            Test your knowledge and compete on the leaderboard!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/#about" className="text-white/60 hover:text-cyan-400 transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/#contact" className="text-white/60 hover:text-cyan-400 transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/leaderboard" className="text-white/60 hover:text-cyan-400 transition-colors">
                                    Leaderboard
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-3">Connect</h3>
                        <div className="flex gap-3">
                            <a
                                href="#"
                                className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5 text-white" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5 text-white" />
                            </a>
                            <a
                                href="#"
                                className="p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5 text-white" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                    <p className="text-white/60 text-sm flex items-center justify-center gap-2">
                        Made with <Heart className="w-4 h-4 text-red-400 fill-red-400" /> © {currentYear} AI QuizGen
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
