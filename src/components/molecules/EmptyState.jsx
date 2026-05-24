import React from 'react';
import Title from '../atoms/Title';
import { Users } from 'lucide-react';

export default function EmptyState({
    title = "Esperando alumnos...",
    description = "Comparte el código de acceso con tu clase para que comiencen a unirse a la lista."
}) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-GrayBlue-300 rounded-2xl bg-white/50 max-w-md mx-auto my-4">
            {/* Círculo contenedor con el icono principal */}
            <div className="w-14 h-14 rounded-full bg-Neutral-100 flex items-center justify-center text-BlueDark-700 mb-4 shadow-inner">
                <Users size={28} />
            </div>

            <Title level={3} className="mb-2">
                {title}
            </Title>

            <p className="text-sm md:text-base text-GrayBlue-500 max-w-xs">
                {description}
            </p>
        </div>
    );
}