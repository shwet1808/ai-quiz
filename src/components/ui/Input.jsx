import React, { forwardRef } from 'react';

const Input = forwardRef(({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    error = '',
    label = '',
    className = '',
    required = false,
    ...props
}, ref) => {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-white/80 mb-2">
                    {label}
                    {required && <span className="text-red-400 ml-1">*</span>}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
          w-full px-4 py-3 rounded-xl backdrop-blur-xl bg-white/10 border border-white/20
          text-white placeholder-white/50 focus:outline-none focus:border-cyan-400/50 
          focus:ring-2 focus:ring-cyan-400/30 transition-all duration-300
          ${error ? 'border-red-400/50 focus:border-red-400/50 focus:ring-red-400/30' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-red-400">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
