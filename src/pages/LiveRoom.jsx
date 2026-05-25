import React from 'react';
import { useRoom } from '../context/RoomContext';
import DashboardLayout from '../layouts/DashboardLayout';
import RoomCodeDisplay from '../components/molecules/RoomCodeDisplay';
import LiveStudentList from '../components/organisms/LiveStudentList';
import TeamGrid from '../components/organisms/TeamGrid';
import Button from '../components/atoms/Button';
import { Users } from 'lucide-react';

export default function LiveRoom({ role, onLeave }) {
    const { roomConfig, students, teams, generateTeams } = useRoom();

    return (
        <DashboardLayout onBack={onLeave}>
            <div className="space-y-6">

                {/* Cabecera superior interna */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-GrayBlue-200 shadow-sm">
                    <RoomCodeDisplay code={roomConfig?.code || '---'} />

                    {/* El botón de procesar solo le aparece al Docente */}
                    {role === 'docente' && teams.length === 0 && (
                        <Button
                            variant="primary"
                            icon={Users}
                            onClick={generateTeams}
                            disabled={students.length === 0}
                            className="w-full md:w-auto"
                        >
                            Procesar y Generar Equipos
                        </Button>
                    )}
                </div>

                {/* Distribución de la pantalla en dos columnas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                    <div className="lg:col-span-1">
                        <LiveStudentList students={students} />
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl border border-GrayBlue-200 shadow-sm min-h-[300px]">
                            <TeamGrid teams={teams} />
                        </div>
                    </div>
                </div>

            </div>
        </DashboardLayout>
    );
}