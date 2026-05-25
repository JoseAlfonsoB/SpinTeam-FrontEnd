import React, { createContext, useContext, useState } from 'react';
// IMPORTAMOS EL SERVICIO DE ALGORITMOS QUE ACABAMOS DE CREAR
import { generateTeamsAlgorithm } from '../services/sortingAlgorithms';

const RoomContext = createContext();

export function RoomProvider({ children }) {
    const [roomConfig, setRoomConfig] = useState(null);
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);

    // Función para que el Docente cree la sala
    const createRoom = (config) => {
        const randomCode = `${config.algorithm}-${Math.floor(100 + Math.random() * 900)}`;
        setRoomConfig({ ...config, code: randomCode });
        setStudents([]);
        setTeams([]);
    };

    // Función para que el Alumno se una a la fila
    const joinRoom = (studentName, roomCode) => {
        if (!roomConfig || roomConfig.code !== roomCode) {
            throw new Error('El código de la sala no existe o es incorrecto.');
        }

        const newStudent = {
            id: Date.now().toString(),
            name: studentName,
            status: 'waiting'
        };

        setStudents((prev) => [...prev, newStudent]);
        return true;
    };

    // FUNCIÓN ACTUALIZADA: Ahora delega la responsabilidad al servicio externo
    const generateTeams = () => {
        if (students.length === 0 || !roomConfig) return;

        // 1. Llamamos al algoritmo de la carpeta services pasando los datos limpios
        const resultTeams = generateTeamsAlgorithm(
            students,
            roomConfig.teamCount,
            roomConfig.algorithm
        );

        // 2. Actualizamos los estados con el resultado del algoritmo
        setStudents((prev) => prev.map(s => ({ ...s, status: 'assigned' })));
        setTeams(resultTeams);
    };

    const resetRoom = () => {
        setRoomConfig(null);
        setStudents([]);
        setTeams([]);
    };

    return (
        <RoomContext.Provider value={{
            roomConfig,
            students,
            teams,
            createRoom,
            joinRoom,
            generateTeams,
            resetRoom
        }}>
            {children}
        </RoomContext.Provider>
    );
}

export function useRoom() {
    return useContext(RoomContext);
}