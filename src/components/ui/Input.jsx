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
                <label className="block text-sm font-medium text-text-secondary mb-2">
                    {label}
                    {required && <span className="text-status-error ml-1">*</span>}
                </label>
            )}
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
          input-field
          ${error ? 'border-status-error focus:border-status-error focus:ring-status-error/30' : ''}
          ${className}
        `}
                {...props}
            />
            {error && (
                <p className="mt-1 text-sm text-status-error">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
