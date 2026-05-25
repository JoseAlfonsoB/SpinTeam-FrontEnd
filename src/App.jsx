import { Routes, Route } from 'react-router-dom';
import { RoomProvider } from './context/RoomContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import RoleSelection from './pages/RoleSelection';
import LoginDocente from './pages/LoginDocente';
import LoginAlumno from './pages/LoginAlumno';
import GeneradorEquipos from './pages/GeneradorEquipos';
import VistaEquipos from './pages/VistaEquipos'; 
import VistaEquiposAlumnos from './pages/VistaEquiposAlumnos'; 
import EquiposUnidos from './pages/EquiposUnidos';

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

        {/* Paso 4.1: Segundo Login (Específico para Alumno) */}
        <Route path="/login-alumno" element={<LoginAlumno />} />

        {/* Paso 5: Generador y Apertura de Salas */}
        <Route path="/generator" element={<GeneradorEquipos />} />

        {/* Paso 5.1: Salas Unidas */}
        <Route path="/unidas" element={<EquiposUnidos />} />

        {/* Paso 6: Dashboard Final de Salas */}
        <Route path="/dashboard" element={<div className="p-8 font-bold">Dashboard del Docente</div>} />

        <Route path="/sala/:codigoSala" element={<VistaEquipos />} />

        <Route path="/salas/:codigoSala" element={<VistaEquiposAlumnos />} />
      </Routes>
    </RoomProvider>
  );
}