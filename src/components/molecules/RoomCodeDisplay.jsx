import React, { useState } from 'react';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import { Copy, Check } from 'lucide-react';

export default function RoomCodeDisplay({ code }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Resetea el estado tras 2 segundos
        } catch (err) {
            console.error('Error al copiar el código: ', err);
        }
    };

    return (
        <div className="bg-white p-4 rounded-xl border border-GrayBlue-200 flex items-center justify-between shadow-sm max-w-sm w-full">
            <div className="flex flex-col">
                <span className="text-xs font-bold text-GrayBlue-500 uppercase tracking-wider">
                    Código de Acceso
                </span>
                <Title level={2} className="tracking-widest text-BlueDark-950 font-mono">
                    {code}
                </Title>
            </div>

            {/* Botón secundario que cambia de icono y texto según el estado copiado */}
            <Button
                variant={copied ? 'primary' : 'secondary'}
                icon={copied ? Check : Copy}
                onClick={handleCopy}
                className="px-3 py-2 text-xs md:text-xs"
            >
                {copied ? '¡Copiado!' : 'Copiar'}
            </Button>
        </div>
    );
}