import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ message = 'Processing...', subMessage = '' }) => {
    return (
        <div className="flex flex-col items-center justify-center p-8">
            {/* Animated Spinner */}
            <div className="relative w-24 h-24 mb-6">
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-cyan-500/30"
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-500 border-r-cyan-500"
                    animate={{
                        rotate: 360
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
                <motion.div
                    className="absolute inset-4 rounded-full border-4 border-transparent border-t-blue-500 border-l-blue-500"
                    animate={{
                        rotate: -360
                    }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            </div>

            {/* Message */}
            <motion.h3
                className="text-xl font-bold text-white mb-2"
                animate={{
                    opacity: [1, 0.5, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity
                }}
            >
                {message}
            </motion.h3>

            {subMessage && (
                <p className="text-white/70 text-center max-w-md">
                    {subMessage}
                </p>
            )}

            {/* Floating Dots */}
            <div className="flex gap-2 mt-4">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-3 h-3 rounded-full bg-cyan-400"
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default LoadingSpinner;
