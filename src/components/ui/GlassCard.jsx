import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({
    children,
    className = '',
    hover = false,
    onClick,
    ...props
}) => {
    const baseClasses = "glass-card";
    const hoverClasses = hover ? "glass-card-hover cursor-pointer" : "";

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
