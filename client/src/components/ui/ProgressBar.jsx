import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({
    progress = 0,
    showLabel = true,
    height = 'h-3',
    className = ''
}) => {
    const percentage = Math.min(100, Math.max(0, progress));

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-text-secondary">Progress</span>
                    <span className="text-sm font-semibold text-accent">{percentage.toFixed(0)}%</span>
                </div>
            )}
            <div className={`w-full bg-background-tertiary rounded-full overflow-hidden ${height}`}>
                <motion.div
                    className="h-full bg-gradient-to-r from-accent via-accent-secondary to-accent rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </motion.div>
            </div>
        </div>
    );
};

export default ProgressBar;
