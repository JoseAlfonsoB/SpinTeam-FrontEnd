import React, { createContext, useContext, useState, useEffect } from 'react';
import { generateTeamsService } from '../services/api';
import { socket } from '../services/socket';

const RoomContext = createContext();

export function RoomProvider({ children }) {
    const [roomConfig, setRoomConfig] = useState(null);
    const [students, setStudents] = useState([]);
    const [teams, setTeams] = useState([]);

    // EFECTO GLOBAL DE SOCKET.IO
    useEffect(() => {
        socket.on('update_students', (updatedStudentsList) => {
            console.log('Actualización de alumnos:', updatedStudentsList);
            setStudents(updatedStudentsList);
        });

        socket.on('teams_ready', (generatedTeams) => {
            console.log('Equipos listos:', generatedTeams);
            setTeams(generatedTeams);
        });

        return () => {
            socket.off('update_students');
            socket.off('teams_ready');
        };
    }, []);

    const connectToRoomSocket = (code, user, role) => {
        if (!socket.connected) {
            socket.connect();
        }
        socket.emit('join_room', { code, user, role });
    };

    const createRoom = (config) => {
        const randomCode = `${config.algorithm}-${Math.floor(100 + Math.random() * 900)}`;
        setRoomConfig({ ...config, code: randomCode });
        setStudents([]);
        setTeams([]);
    };

    // Función del alumno para entrar
    const joinRoom = (user, roomCode) => {
        connectToRoomSocket(roomCode, user, 'alumno');
    };

    // Función del docente para generar (llama a API REST y luego emite Socket)
    const generateTeams = async (roomCode) => {
        if (students.length === 0) return;

        try {
            const response = await generateTeamsService(roomCode);
            setTeams(response.teams);
            
            // Avisa a los demás que ya están listos
            socket.emit('teams_generated', { code: roomCode, teams: response.teams });
            
        } catch (error) {
            console.error('Error al generar equipos:', error);
            alert(error.message || 'Hubo un problema al generar los equipos.');
        }
    };

    const resetRoom = () => {
        socket.disconnect();
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
            connectToRoomSocket,
            resetRoom
        }}>
            {children}
        </RoomContext.Provider>
    );
}

export function useRoom() {
    return useContext(RoomContext);
}