import React from 'react';
import Badge from '../atoms/Badge';
import { User, Clock, CheckCircle } from 'lucide-react';

export default function StudentRow({ name, index, status = 'waiting' }) {
    return (
        <div className="flex items-center justify-between p-3.5 bg-Neutral-50 hover:bg-Neutral-100 rounded-lg border border-GrayBlue-200 transition-colors duration-150">
            <div className="flex items-center gap-3">
                {/* Indicador de posición FIFO */}
                <span className="w-6 h-6 flex items-center justify-center rounded-full bg-BlueDark-800 text-Neutral-50 text-xs font-bold font-mono">
                    {index + 1}
                </span>

                {/* Nombre del estudiante junto a un icono sutil */}
                <div className="flex items-center gap-2">
                    <User size={16} className="text-GrayBlue-500" />
                    <span className="font-semibold text-BlueDark-950 text-sm md:text-base">
                        {name}
                    </span>
                </div>
            </div>

            {/* Badge dinámico basado en el estado */}
            <Badge
                variant={status === 'assigned' ? 'success' : 'default'}
                icon={status === 'assigned' ? CheckCircle : Clock}
            >
                {status === 'assigned' ? 'Asignado' : 'En espera'}
            </Badge>
        </div>
    );
}