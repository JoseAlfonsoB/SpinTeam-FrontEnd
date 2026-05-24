import React from 'react';

export default function Badge({
    children,
    variant = 'default', // default | success | info
    icon: Icon,          // Icono opcional de lucide-react
    className = ''
}) {
    // Configuración de estilos basados en tu paleta de colores
    const styles = {
        // Para contadores o estados neutrales (usa GrayBlue)
        default: 'bg-GrayBlue-200 text-BlueDark-900 border border-GrayBlue-300',
        // Para estados activos o listos (usa la combinación Neutral cálida)
        success: 'bg-Neutral-100 text-BlueDark-950 border border-Neutral-300',
        // Para destacar elementos clave o el rol principal (usa el azul del proyecto)
        info: 'bg-BlueDark-600 text-Neutral-50',
    };

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs md:text-sm font-medium rounded-full ${styles[variant]} ${className}`}>
            {Icon && <Icon size={14} className="flex-shrink-0" />}
            {children}
        </span>
    );
}