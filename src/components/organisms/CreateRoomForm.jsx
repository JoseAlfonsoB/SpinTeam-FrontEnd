import React, { useState } from 'react';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { Plus, Users, Hash } from 'lucide-react';

export default function CreateRoomForm({ onCreateRoom }) {
    const [roomName, setRoomName] = useState('');
    const [teamCount, setTeamCount] = useState(2);
    const [algorithm, setAlgorithm] = useState('FIFO'); // FIFO | RANDOM
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentErrors = {};

        if (!roomName.trim()) {
            currentErrors.roomName = 'El nombre de la sala es obligatorio.';
        }
        if (teamCount < 2) {
            currentErrors.teamCount = 'Debes configurar al menos 2 equipos.';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        setErrors({});
        // Disparamos la acción hacia la página/servicio superior
        onCreateRoom({ roomName, teamCount: Number(teamCount), algorithm });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-GrayBlue-200 shadow-sm max-w-md w-full space-y-5">
            <div className="border-b border-GrayBlue-200 pb-3">
                <Title level={3}>Crear Nueva Sala</Title>
                <p className="text-xs text-GrayBlue-400 mt-1">Configura los parámetros para que tus alumnos se unan.</p>
            </div>

            <FormField
                label="Nombre de la Sala / Clase"
                id="room-name"
                placeholder="Ej. Estructuras de Datos - Grupo 401"
                icon={Users}
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                error={errors.roomName}
                required
            />

            <FormField
                label="Número de Equipos a Generar"
                id="team-count"
                type="number"
                min="2"
                max="20"
                icon={Hash}
                value={teamCount}
                onChange={(e) => setTeamCount(e.target.value)}
                error={errors.teamCount}
                required
            />

            {/* Selector de Algoritmo usando clases nativas del @theme */}
            <div className="flex flex-col">
                <label className="block text-sm font-semibold text-BlueDark-800 mb-2 select-none">
                    Método de Selección / Ordenamiento
                </label>
                <div className="grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => setAlgorithm('FIFO')}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all duration-150 cursor-pointer ${algorithm === 'FIFO'
                                ? 'border-BlueDark-800 bg-BlueDark-950 text-Neutral-50 font-bold shadow-sm'
                                : 'border-GrayBlue-200 bg-Neutral-50 text-BlueDark-900 hover:bg-Neutral-100'
                            }`}
                    >
                        Fila de Espera (FIFO)
                    </button>
                    <button
                        type="button"
                        onClick={() => setAlgorithm('RANDOM')}
                        className={`p-3 rounded-lg border text-sm font-medium transition-all duration-150 cursor-pointer ${algorithm === 'RANDOM'
                                ? 'border-BlueDark-800 bg-BlueDark-950 text-Neutral-50 font-bold shadow-sm'
                                : 'border-GrayBlue-200 bg-Neutral-50 text-BlueDark-900 hover:bg-Neutral-100'
                            }`}
                    >
                        Aleatorio Puro
                    </button>
                </div>
            </div>

            <Button type="submit" variant="primary" icon={Plus} className="w-full mt-2">
                Generar y Abrir Sala
            </Button>
        </form>
    );
}