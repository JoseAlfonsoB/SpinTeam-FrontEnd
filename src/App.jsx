import { Routes, Route } from 'react-router-dom';
import { RoomProvider } from './context/RoomContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import GeneradorEquipos from './pages/GeneradorEquipos'; // <-- Importamos la nueva pantalla

export default function App() {
  return (
    <RoomProvider>
      <Routes>
        {/* 1. Página de Inicio */}
        <Route path="/" element={<LandingPage />} />

        {/* 2. Primer Login */}
        <Route path="/login" element={<Login />} />

        {/* 3. Selección de Rol */}
        <Route path="/select-role" element={<RoleSelection />} />

        {/* 4. Segundo Login (Generador de Equipos para Docentes) */}
        <Route path="/generator" element={<GeneradorEquipos />} />

        {/* 5. Dashboard Final */}
        <Route path="/dashboard" element={<div className="p-8 font-bold">Aquí irá el Dashboard con las Cards de las salas creadas</div>} />
      </Routes>
    </RoomProvider>
  );
}