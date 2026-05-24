import React from 'react';

export default function Label({ children, htmlFor, required = false, className = '' }) {
    return (
        <label
            htmlFor={htmlFor}
            className={`block text-sm font-semibold text-BlueDark-800 mb-1.5 select-none ${className}`}
        >
            {children}
            {required && <span className="text-red-500 ml-1" title="Este campo es obligatorio">*</span>}
        </label>
    );
}