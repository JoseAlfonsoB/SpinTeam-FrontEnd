import React from 'react';
import { Users, ShieldAlert } from 'lucide-react';

export default function TeamGrid({ teams = [], maxCapacidad = 4 }) {
    
    // Función auxiliar para extraer las iniciales dinámicamente del nombre del alumno
    const getInitials = (name) => {
        if (!name) return '??';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch w-full">
            {teams.map((team, index) => (
                <div
                    key={team.team_id || index}
                    className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col justify-between"
                >
                    {/* Cabecera Azul Oscuro */}
                    <div className="bg-BlueDark-950 text-white px-6 py-4 flex justify-between items-center">
                        <span className="text-sm font-bold tracking-tight">
                            Equipo {team.team_id || index + 1}
                        </span>
                        <div className="bg-white/10 p-1.5 rounded-lg text-white/80">
                            <Users size={14} />
                        </div>
                    </div>

                    {/* Cuerpo: Lista de Integrantes */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                        <div className="space-y-3.5">
                            {team.members && team.members.length > 0 ? (
                                team.members.map((member, mIndex) => (
                                    <div
                                        key={member.id || mIndex}
                                        className="flex items-center gap-3 py-1 animate-fade-in"
                                    >
                                        {/* Iniciales en Círculo */}
                                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[11px] font-black text-blue-600 shadow-sm">
                                            {getInitials(member.name)}
                                        </div>
                                        {/* Nombre del Estudiante */}
                                        <span className="text-xs font-bold text-gray-600 tracking-tight">
                                            {member.name}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-6 text-center text-gray-300 space-y-1">
                                    <ShieldAlert size={20} strokeWidth={1.5} />
                                    <p className="text-[11px] font-semibold">Sin alumnos asignados</p>
                                </div>
                            )}
                        </div>

                        {/* Base de la Card: Contador de Capacidad */}
                        <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400">
                            <span className="text-[10px] uppercase tracking-wider font-semibold">Capacidad</span>
                            <span className="bg-BlueDark-950 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black">
                                {(team.members && team.members.length) || 0}/{maxCapacidad}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}