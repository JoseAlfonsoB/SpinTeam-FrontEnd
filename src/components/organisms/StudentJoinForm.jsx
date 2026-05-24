import React, { useState } from 'react';
import Title from '../atoms/Title';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { User, Key, LogIn } from 'lucide-react';

export default function StudentJoinForm({ onJoin, isLoading = false }) {
    const [studentName, setStudentName] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [errors, setErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentErrors = {};

        if (!studentName.trim()) {
            currentErrors.studentName = 'Por favor, escribe tu nombre completo.';
        }
        if (!roomCode.trim()) {
            currentErrors.roomCode = 'El código de acceso es obligatorio.';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        setErrors({});
        onJoin({ studentName: studentName.trim(), roomCode: roomCode.trim().toUpperCase() });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-GrayBlue-200 shadow-sm max-w-sm w-full space-y-4">
            <div className="text-center pb-2">
                <Title level={2} className="text-BlueDark-950">Ingresar a una Sala</Title>
                <p className="text-xs text-GrayBlue-500 mt-1">Registra tu asistencia para que el docente te asigne un equipo.</p>
            </div>

            <FormField
                label="Tu Nombre Completo"
                id="student-name"
                placeholder="Ej. Juan Pérez García"
                icon={User}
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                error={errors.studentName}
                required
            />

            <FormField
                label="Código de la Sala"
                id="room-code"
                placeholder="Ej. FIFO-123"
                icon={Key}
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                error={errors.roomCode}
                required
            />

            <Button type="submit" variant="primary" icon={LogIn} loading={isLoading} className="w-full mt-2">
                Ingresar a la Fila
            </Button>
        </form>
    );
}