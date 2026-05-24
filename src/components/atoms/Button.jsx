import React from 'react';

export default function Button({
    children,
    onClick,
    type = 'button',
    variant = 'primary', // primary | secondary | danger
    icon: Icon,
    iconRight: IconRight,
    disabled = false,
    loading = false,
    className = '',
    ...props
}) {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 text-sm md:text-base px-5 py-2.5 outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2 cursor-pointer';

    // Mapeo exacto a las variables de tu @theme
    const variants = {
        primary: 'bg-BlueDark-950 hover:bg-BlueDark-900 text-Neutral-50 focus:ring-BlueDark-700',
        secondary: 'bg-Neutral-200 hover:bg-Neutral-300 text-BlueDark-950 border border-Neutral-300 focus:ring-GrayBlue-300',
        danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {loading && (
                <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            )}

            {!loading && Icon && <Icon size={18} className="flex-shrink-0" />}

            <span>{loading ? 'Cargando...' : children}</span>

            {!loading && IconRight && <IconRight size={18} className="flex-shrink-0" />}
        </button>
    );
}