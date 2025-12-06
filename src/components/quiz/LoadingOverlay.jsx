import React from 'react';
import { motion } from 'framer-motion';

const LoadingOverlay = () => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="text-center">
                <motion.div
                    className="relative w-32 h-32 mx-auto mb-8"
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <div className="absolute inset-0 rounded-full border-4 border-cyan-500/30"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-cyan-500"></div>
                </motion.div>

                <motion.h2
                    className="text-3xl font-bold gradient-text mb-4"
                    animate={{
                        opacity: [1, 0.5, 1]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity
                    }}
                >
                    Generating Your Quiz...
                </motion.h2>

                <motion.p
                    className="text-white/70"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    AI is crafting personalized questions for you
                </motion.p>

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                        style={{
                            left: `${50 + Math.cos((i / 8) * Math.PI * 2) * 150}px`,
                            top: `${50 + Math.sin((i / 8) * Math.PI * 2) * 150}px`,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default LoadingOverlay;
