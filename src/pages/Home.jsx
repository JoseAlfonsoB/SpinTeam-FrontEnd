import React, { useState } from 'react';
import { useRoom } from '../context/RoomContext';
import DashboardLayout from '../layouts/DashboardLayout';
import CreateRoomForm from '../components/organisms/CreateRoomForm';
import StudentJoinForm from '../components/organisms/StudentJoinForm';
import Title from '../components/atoms/Title';

export default function Home({ onSelectRole }) {
    const { createRoom, joinRoom } = useRoom();
    const [error, setError] = useState('');

    const handleCreate = (config) => {
        createRoom(config);
        onSelectRole('docente'); // Cambia el estado superior a vista docente
    };

    const handleJoin = ({ studentName, roomCode }) => {
        try {
            setError('');
            joinRoom(studentName, roomCode);
            onSelectRole('alumno'); // Cambia el estado superior a vista alumno
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <DashboardLayout>
            <div className="flex flex-col items-center justify-center py-6 md:py-12 space-y-8">
                <div className="text-center max-w-md">
                    <Title level={1} className="text-BlueDark-950 font-black">Generador de Equipos</Title>
                    <p className="text-sm md:text-base text-GrayBlue-500 mt-2">
                        Crea salas como docente u únete a la fila FIFO como alumno para organizar tus actividades en segundos.
                    </p>
                    {error && (
                        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm font-semibold rounded-lg">
                            {error}
                        </div>
                    )}
                </div>

                {/* Grid para separar accesos de Profesor y Alumno */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl items-start justify-items-center">
                    <div className="w-full flex flex-col items-center">
                        <span className="text-xs font-bold text-BlueDark-700 uppercase tracking-widest mb-3 block">Sección del Docente</span>
                        <CreateRoomForm onCreateRoom={handleCreate} />
                    </div>

                    <div className="w-full flex flex-col items-center">
                        <span className="text-xs font-bold text-BlueDark-700 uppercase tracking-widest mb-3 block">Sección del Alumno</span>
                        <StudentJoinForm onJoin={handleJoin} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}