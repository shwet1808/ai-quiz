import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { QuizProvider } from './context/QuizContext';
import { AudioProvider } from './context/AudioContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Leaderboard from './pages/Leaderboard';

function App() {
    return (
        <BrowserRouter>
            <AudioProvider>
                <QuizProvider>
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<Layout />}>
                                <Route index element={<Home />} />
                                <Route path="quiz" element={<Quiz />} />
                                <Route path="result" element={<Result />} />
                                <Route path="leaderboard" element={<Leaderboard />} />
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
                        theme="dark"
                        toastClassName="backdrop-blur-xl bg-slate-800/90 border border-white/10"
                    />
                </QuizProvider>
            </AudioProvider>
        </BrowserRouter>
    );
}

export default App;
