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
                    <span className="text-sm text-white/70">Progress</span>
                    <span className="text-sm font-semibold text-cyan-400">{percentage.toFixed(0)}%</span>
                </div>
            )}
            <div className={`w-full bg-white/10 rounded-full overflow-hidden ${height}`}>
                <motion.div
                    className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full"
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
