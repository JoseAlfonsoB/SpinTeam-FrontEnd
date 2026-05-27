import { io } from 'socket.io-client';

// Usamos la misma variable de entorno que apunta al puerto 4000
const SESSION_API_URL = import.meta.env.VITE_SESSION_API_URL || 'http://localhost:4000';

export const socket = io(SESSION_API_URL, {
    autoConnect: false // Lo conectaremos manualmente cuando el usuario entre a una sala
});