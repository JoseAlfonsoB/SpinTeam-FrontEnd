import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { RoomProvider } from './context/RoomContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import RegisterRole from './pages/RegisterRole';
import RegisterDocente from './pages/RegisterDocente';
import RegisterAlumno from './pages/RegisterAlumno';
import GeneradorEquipos from './pages/GeneradorEquipos';
import VistaEquipos from './pages/VistaEquipos'; 
import VistaEquiposAlumnos from './pages/VistaEquiposAlumnos'; 
import EquiposUnidos from './pages/EquiposUnidos';
import AuthCallback from './pages/AuthCallback';

export default function App() {
  return (
    <AuthProvider>
      <RoomProvider>
        <Routes>
        {/* Paso 1: Landing Page principal */}
        <Route path="/" element={<LandingPage />} />

        {/* Paso 2: Primer Login General */}
        <Route path="/login" element={<Login />} />
        
        {/* Pasar por archivo de valdiacion de google */}
        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* Paso 3: Selección de Rol para Registro */}
        <Route path="/register-role" element={<RegisterRole />} />

        {/* Paso 4: Registro Específico para Docente */}
        <Route path="/register-docente" element={<RegisterDocente />} />

        {/* Paso 4.1: Registro Específico para Alumno */}
        <Route path="/register-alumno" element={<RegisterAlumno />} />

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
    </AuthProvider>
  );
}