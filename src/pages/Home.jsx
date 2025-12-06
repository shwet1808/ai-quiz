import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/home/HeroSection';
import UserSetupForm from '../components/home/UserSetupForm';
import SuggestedQuizzes from '../components/home/SuggestedQuizzes';
import AboutSection from '../components/home/AboutSection';
import ContactSection from '../components/home/ContactSection';

const Home = () => {
    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleQuizSelect = (topic, difficulty) => {
        // This will be handled by the UserSetupForm component
        // We'll pass the selected quiz data through a callback
        scrollToForm();

        // Dispatch custom event to auto-fill form
        window.dispatchEvent(new CustomEvent('autoFillQuiz', {
            detail: { topic, difficulty }
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
        >
            <HeroSection onGetStarted={scrollToForm} />

            <div ref={formRef}>
                <UserSetupForm />
            </div>

            <SuggestedQuizzes onQuizSelect={handleQuizSelect} />

            <AboutSection />

            <ContactSection />
        </motion.div>
    );
};

export default Home;
