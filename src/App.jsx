import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './context/ThemeContext';

import { QuizProvider } from './context/QuizContext';
import { AudioProvider } from './context/AudioContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';

function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <AudioProvider>
                    <QuizProvider>
                        <AnimatePresence mode="wait">
                            <Routes>
                                <Route path="/" element={<Layout />}>
                                    <Route index element={<Home />} />
                                    <Route path="quiz" element={<Quiz />} />
                                    <Route path="result" element={<Result />} />
                                    <Route path="leaderboard" element={<Leaderboard />} />
                                    <Route path="profile" element={<Profile />} />
                                </Route>
                            </Routes>
                        </AnimatePresence>

                        {/* Toast Notifications */}
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
    );
}

export default App;
