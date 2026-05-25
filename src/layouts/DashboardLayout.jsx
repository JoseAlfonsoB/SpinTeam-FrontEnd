import React from 'react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { LogOut, Users } from 'lucide-react';
import { useRoom } from '../context/RoomContext';

export default function DashboardLayout({ children, onBack }) {
    const { roomConfig } = useRoom();

    return (
        <div className="min-h-screen bg-Neutral-50 flex flex-col font-sans">
            {/* Barra de navegación superior unificada */}
            <header className="bg-BlueDark-950 text-Neutral-50 px-4 md:px-8 py-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2.5">
                    <div className="bg-Neutral-50 text-BlueDark-950 p-2 rounded-lg">
                        <Users size={20} />
                    </div>
                    <div>
                        <Title level={3} className="text-white text-base md:text-xl">
                            {roomConfig ? roomConfig.roomName : 'Gestor de Equipos'}
                        </Title>
                        {roomConfig && (
                            <span className="text-xs text-GrayBlue-300 font-mono tracking-wider block">
                                Sala: {roomConfig.code}
                            </span>
                        )}
                    </div>
                </div>

                {onBack && (
                    <Button
                        variant="secondary"
                        icon={LogOut}
                        onClick={onBack}
                        className="px-3 py-1.5 text-xs md:text-xs bg-white/10 hover:bg-white/20 text-white border-none"
                    >
                        Salir
                    </Button>
                )}
            </header>

            {/* Contenido dinámico de las páginas */}
            <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-fade-in">
                {children}
            </main>
        </div>
    );
}