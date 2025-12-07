import React from 'react';
import { motion } from 'framer-motion';

const CircularTimer = ({
    timeLeft,
    totalTime = 15,
    size = 80,
    strokeWidth = 6
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const percentage = (timeLeft / totalTime) * 100;
    const offset = circumference - (percentage / 100) * circumference;

    // Color based on time remaining uses semantic variables
    const getColor = () => {
        if (percentage > 50) return 'rgb(var(--accent-primary))';
        if (percentage > 25) return 'rgb(var(--status-warning))';
        return 'rgb(var(--status-error))';
    };

    return (
        <div className="relative inline-flex items-center justify-center">
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    className="stroke-background-tertiary"
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.5, ease: 'linear' }}
                    style={{
                        filter: `drop-shadow(0 0 8px ${getColor()})`
                    }}
                />
            </svg>

            {/* Time text */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                    className={`text-xl font-bold ${percentage <= 25 ? 'text-status-error animate-pulse' : 'text-text'
                        }`}
                    animate={percentage <= 25 ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    {timeLeft}
                </motion.span>
            </div>
        </div>
    );
};

export default CircularTimer;
