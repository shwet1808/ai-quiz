import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';

import { QuizProvider } from './context/QuizContext';
import { AudioProvider } from './context/AudioContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

// App is the main wrapper for our website. It sets up "Providers" (which share data across the app)
// and "Routes" (which tell the app which page to show based on the URL).
function App() {
    return (
        <ErrorBoundary>
            {/* BrowserRouter enables routing (changing pages without reloading the browser) */}
            <BrowserRouter>
                {/* ThemeProvider manages light/dark mode and shares that info everywhere */}
                <ThemeProvider>
                {/* AudioProvider manages sound effects and background music */}
                <AudioProvider>
                    {/* QuizProvider stores your score, current question, and username */}
                    <QuizProvider>
                        
                        {/* AnimatePresence makes pages slide/fade in nicely when you switch routes */}
                        <AnimatePresence mode="wait">
                            <Routes>
                                {/* The Layout component is our skeleton (Navbar on top, Footer on bottom).
                                    Everything else goes inside it! */}
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="quiz" element={<Quiz />} />
                                    <Route path="result" element={<Result />} />
                                    <Route path="leaderboard" element={<Leaderboard />} />
                                    <Route path="profile" element={<Profile />} />
                                </Route>
                            </Routes>
                        </AnimatePresence>

                        {/* ToastContainer is what creates the little pop-up notifications in the corner */}
                        <ToastContainer
                            position="top-right"
                            autoClose={3000}
                            hideProgressBar={false}
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                            toastClassName="backdrop-blur-xl bg-background-secondary border border-border text-text"
                        />
                    </QuizProvider>
                </AudioProvider>
            </ThemeProvider>
            </BrowserRouter>
        </ErrorBoundary>
    );
}

export default App;
