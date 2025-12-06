import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
    children,
    className = '',
    hover = false,
    onClick,
    ...props
}) => {
    const baseClasses = "backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl";
    const hoverClasses = hover ? "transition-all duration-300 hover:bg-white/15 hover:border-white/30 hover:shadow-2xl cursor-pointer" : "";

    const Component = hover ? motion.div : 'div';
    const motionProps = hover ? {
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 }
    } : {};

    return (
        <Component
            className={`${baseClasses} ${hoverClasses} ${className}`}
            onClick={onClick}
            {...motionProps}
            {...props}
        >
            {children}
        </Component>
    );
};

export default GlassCard;
