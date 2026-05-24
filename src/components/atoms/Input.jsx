import React from 'react';

export default function Input({
    type = 'text',
    placeholder = '',
    value,
    onChange,
    name,
    icon: Icon,
    error = false,
    className = '',
    ...props
}) {
    return (
        <div className="relative w-full">
            {/* Icono de lucide-react adaptado a los tonos GrayBlue */}
            {Icon && (
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-GrayBlue-400">
                    <Icon size={18} />
                </div>
            )}

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`
          w-full px-4 py-2.5 rounded-lg text-BlueDark-950 placeholder-GrayBlue-400
          transition-all duration-200 outline-none text-sm md:text-base bg-Neutral-50
          ${Icon ? 'pl-10' : 'pl-4'}
          ${error
                        ? 'border border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border border-gray-300 focus:border-BlueDark-700 focus:ring-2 focus:ring-GrayBlue-200'
                    }
          ${className}
        `}
                {...props}
            />
        </div>
    );
}