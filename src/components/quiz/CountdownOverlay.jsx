import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownOverlay = ({ onComplete }) => {
    const [count, setCount] = useState(3);

    useEffect(() => {
        if (count > 0) {
            const timer = setTimeout(() => setCount(count - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            onComplete();
        }
    }, [count, onComplete]);

    return (
        <AnimatePresence>
            {count > 0 && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        key={count}
                        className="text-9xl font-bold gradient-text"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {count}
                    </motion.div>

                    {/* Expanding circle */}
                    <motion.div
                        className="absolute w-64 h-64 rounded-full border-4 border-cyan-500"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 3, opacity: 0 }}
                        transition={{ duration: 1 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CountdownOverlay;
