import React from 'react';

export default function Title({ children, level = 1, className = '' }) {
    // Ajustado con la paleta de colores del proyecto
    const styles = {
        1: 'text-3xl md:text-4xl font-extrabold text-BlueDark-950 tracking-tight',
        2: 'text-2xl md:text-3xl font-bold text-BlueDark-900 tracking-tight',
        3: 'text-xl md:text-2xl font-semibold text-BlueDark-800',
        4: 'text-lg font-medium text-GrayBlue-500',
    };

    const safeLevel = styles[level] ? level : 1;
    const Tag = `h${safeLevel}`;

    return (
        <Tag className={`${styles[safeLevel]} ${className}`}>
            {children}
        </Tag>
    );
}