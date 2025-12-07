import React from 'react';
import { Github, Twitter, Linkedin, Heart } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative mt-20 border-t border-border backdrop-blur-xl bg-background-secondary">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="text-lg font-bold gradient-text mb-3">AI QuizGen</h3>
                        <p className="text-text-secondary text-sm">
                            Challenge yourself with AI-generated quizzes on various topics.
                            Test your knowledge and compete on the leaderboard!
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold text-text mb-3">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="/#about" className="text-text-secondary hover:text-accent transition-colors">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/#contact" className="text-text-secondary hover:text-accent transition-colors">
                                    Contact
                                </a>
                            </li>
                            <li>
                                <a href="/leaderboard" className="text-text-secondary hover:text-accent transition-colors">
                                    Leaderboard
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-bold text-text mb-3">Connect</h3>
                        <div className="flex gap-3">
                            <a
                                href="https://github.com/shwet1808"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-background-tertiary hover:bg-background-tertiary/80 transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-5 h-5 text-text" />
                            </a>
                            <a
                                href="https://x.com/shwet1808"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-background-tertiary hover:bg-background-tertiary/80 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5 text-text" />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/shwet-kumar-518b52339/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-background-tertiary hover:bg-background-tertiary/80 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5 text-text" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
