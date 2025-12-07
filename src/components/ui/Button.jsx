import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../../context/AudioContext';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    onClick,
    disabled = false,
    className = '',
    icon,
    ...props
}) => {
    const { playSound } = useAudio();

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'bg-status-error hover:bg-status-error/90 text-white shadow-lg shadow-status-error/30',
        ghost: 'btn-ghost'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const handleClick = (e) => {
        if (!disabled) {
            playSound('click');
            onClick?.(e);
        }
    };

    return (
        <motion.button
            className={`
        relative rounded-xl font-semibold overflow-hidden
        transition-all duration-300 hover:scale-105 hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        flex items-center justify-center gap-2
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
            onClick={handleClick}
            disabled={disabled}
            whileHover={!disabled ? { scale: 1.05 } : {}}
            whileTap={!disabled ? { scale: 0.95 } : {}}
            {...props}
        >
            {icon && <span>{icon}</span>}
            {children}
        </motion.button>
    );
};

export default Button;
