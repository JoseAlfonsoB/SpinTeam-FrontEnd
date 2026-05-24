import React from 'react';
import Title from '../atoms/Title';
import Badge from '../atoms/Badge';
import { ShieldAlert, User, Users } from 'lucide-react';

export default function TeamGrid({ teams = [] }) {
    if (teams.length === 0) {
        return (
            <div className="text-center p-6 bg-white border border-GrayBlue-200 rounded-xl">
                <p className="text-sm text-GrayBlue-500">Aún no se han generado los equipos de trabajo.</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex items-center gap-2 border-b border-GrayBlue-200 pb-2">
                <Users size={22} className="text-BlueDark-800" />
                <Title level={2}>Equipos Generados</Title>
            </div>

            {/* Grid responsivo adaptado con Tailwind */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {teams.map((team, teamIndex) => (
                    <div
                        key={team.id || teamIndex}
                        className="bg-white border border-GrayBlue-200 rounded-xl overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md"
                    >
                        {/* Cabecera de la tarjeta del equipo */}
                        <div className="bg-BlueDark-950 p-3 flex items-center justify-between text-Neutral-50">
                            <span className="font-bold text-sm md:text-base tracking-wide">
                                {team.name || `Equipo ${teamIndex + 1}`}
                            </span>
                            <Badge variant="default" className="bg-white/20 border-none text-white text-xs">
                                {team.members.length} Integrantes
                            </Badge>
                        </div>

                        {/* Listado de integrantes dentro de la tarjeta */}
                        <div className="p-3 flex-1 bg-Neutral-50/50 space-y-1.5">
                            {team.members.map((member, memberIndex) => (
                                <div
                                    key={member.id || memberIndex}
                                    className="flex items-center gap-2 py-1.5 px-2 bg-white rounded border border-GrayBlue-100 text-sm text-BlueDark-950 font-medium"
                                >
                                    <User size={14} className="text-GrayBlue-400" />
                                    <span>{member.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}