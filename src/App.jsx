import { Routes, Route } from 'react-router-dom';
import { RoomProvider } from './context/RoomContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import LoginDocente from './pages/LoginDocente';       // <-- 1. Importamos el login de Docente
import GeneradorEquipos from './pages/GeneradorEquipos';
import VistaEquipos from './pages/VistaEquipos'; // Importamos la nueva vista

export default function App() {
  return (
    <RoomProvider>
      <Routes>
        {/* Paso 1: Landing Page principal */}
        <Route path="/" element={<LandingPage />} />

        {/* Paso 2: Primer Login General */}
        <Route path="/login" element={<Login />} />

        {/* Paso 3: Selección de Rol */}
        <Route path="/select-role" element={<RoleSelection />} />

        {/* Paso 4: Segundo Login (Específico para Docente) */}
        <Route path="/login-docente" element={<LoginDocente />} />

        {/* Paso 5: Generador y Apertura de Salas */}
        <Route path="/generator" element={<GeneradorEquipos />} />

        {/* Paso 6: Dashboard Final de Salas */}
        <Route path="/dashboard" element={<div className="p-8 font-bold">Dashboard del Docente</div>} />

        <Route path="/sala/:codigoSala" element={<VistaEquipos />} />
      </Routes>
    </RoomProvider>
  );
}