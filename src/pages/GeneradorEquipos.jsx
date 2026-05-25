import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Hash, ArrowRight, Plus } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';

export default function GeneradorEquipos() {
    const navigate = useNavigate();

    // Estados del Formulario Docente
    const [roomName, setRoomName] = useState('');
    const [teamCount, setTeamCount] = useState('2');
    const [selectionMethod, setSelectionMethod] = useState('FIFO'); // FIFO o Aleatorio

    // Estados del Formulario Alumno
    const [studentName, setStudentName] = useState('Jose Alfonso');
    const [roomCode, setRoomCode] = useState('FIFO-815');

    // Estado de Error
    const [error, setError] = useState('El código de la sala no existe o es incorrecto.');

    const handleCreateRoom = (e) => {
        e.preventDefault();
        // Aquí irá la lógica de creación cuando conectemos el contexto
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-[#f5f4f0] font-sans text-BlueDark-950 flex flex-col justify-between">

            {/* HEADER SUPERIOR OSCURO */}
            <header className="bg-BlueDark-950 text-white px-6 py-4 flex items-center shadow-md">
                <div className="max-w-7xl w-full mx-auto flex items-center gap-3">
                    <div className="bg-white/10 p-2 rounded-lg">
                        <Users size={20} className="text-white" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">Gestor de Equipos</span>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-12 flex flex-col items-center justify-center space-y-8">

                {/* Títulos Principales */}
                <div className="text-center space-y-2 max-w-xl">
                    <Title level={1} className="text-3xl md:text-4xl font-black text-BlueDark-950">
                        Generador de Equipos
                    </Title>
                    <p className="text-sm md:text-base text-gray-500 font-medium">
                        Crea salas como docente u únete a la fila FIFO como alumno para organizar tus actividades en segundos.
                    </p>
                </div>

                {/* Mensaje de Alerta / Error */}
                {error && (
                    <div className="w-full max-w-md bg-red-50 border border-red-200 text-red-600 text-xs font-bold py-3 px-6 rounded-xl text-center shadow-sm animate-fade-in">
                        {error}
                    </div>
                )}

                {/* CONTENEDOR DE DOS COLUMNAS (TARJETAS) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch pt-4">

                    {/* SECCIÓN DEL DOCENTE */}
                    <div className="flex flex-col space-y-4">
                        <span className="text-center text-[11px] font-black tracking-widest text-BlueDark-700 uppercase">
                            Sección del Docente
                        </span>

                        <div className="bg-white rounded-[2rem] border border-gray-200/60 shadow-xl p-8 md:p-10 flex-1 flex flex-col justify-between space-y-6">
                            <div className="space-y-6">
                                <div>
                                    <Title level={2} className="text-2xl font-black text-BlueDark-950">
                                        Crear Nueva Sala
                                    </Title>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                                        Configura los parámetros para que tus alumnos se unan.
                                    </p>
                                </div>

                                <form onSubmit={handleCreateRoom} className="space-y-5">
                                    {/* Input: Nombre de Sala */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-BlueDark-950 flex items-center gap-1">
                                            Nombre de la Sala / Clase <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                <Users size={16} />
                                            </div>
                                            <input
                                                type="text"
                                                value={roomName}
                                                onChange={(e) => setRoomName(e.target.value)}
                                                placeholder="Ej. Estructuras de Datos - Grupo 401"
                                                className="w-full bg-[#fcfbfa] border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-BlueDark-700 transition-colors placeholder:text-gray-300"
                                            />
                                        </div>
                                    </div>

                                    {/* Input: Número de Equipos */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-BlueDark-950">
                                            Número de Equipos a Generar <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                <Hash size={16} />
                                            </div>
                                            <input
                                                type="number"
                                                value={teamCount}
                                                onChange={(e) => setTeamCount(e.target.value)}
                                                placeholder="2"
                                                min="1"
                                                className="w-full bg-[#fcfbfa] border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-BlueDark-700 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Selector: Método de Selección */}
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-BlueDark-950 block">
                                            Método de Selección / Ordenamiento
                                        </label>
                                        <div className="grid grid-cols-2 gap-2 bg-[#f5f4f0] p-1 rounded-xl border border-gray-200">
                                            <button
                                                type="button"
                                                onClick={() => setSelectionMethod('FIFO')}
                                                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${selectionMethod === 'FIFO'
                                                    ? 'bg-BlueDark-950 text-white shadow-sm'
                                                    : 'text-gray-500 hover:text-BlueDark-950'
                                                    }`}
                                            >
                                                Fila de Espera (FIFO)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSelectionMethod('Aleatorio')}
                                                className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${selectionMethod === 'Aleatorio'
                                                    ? 'bg-BlueDark-950 text-white shadow-sm'
                                                    : 'text-gray-500 hover:text-BlueDark-950'
                                                    }`}
                                            >
                                                Aleatorio Puro
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                iconRight={Plus}
                                onClick={handleCreateRoom}
                                className="w-full py-3.5 text-sm font-bold bg-BlueDark-950 hover:bg-BlueDark-950/90 text-white flex justify-center items-center gap-2 rounded-xl transition-colors shadow-sm"
                            >
                                Generar y Abrir Sala
                            </Button>
                        </div>
                    </div>

                    {/* SECCIÓN DEL ALUMNO */}
                    <div className="flex flex-col space-y-4">
                        <span className="text-center text-[11px] font-black tracking-widest text-BlueDark-700 uppercase">
                            Sección del Alumno
                        </span>

                        <div className="bg-white rounded-[2rem] border border-gray-200/60 shadow-xl p-8 md:p-10 flex-1 flex flex-col justify-between space-y-6">
                            <div className="space-y-6">
                                <div>
                                    <Title level={2} className="text-2xl font-black text-BlueDark-950">
                                        Ingresar a una Sala
                                    </Title>
                                    <p className="text-xs text-gray-400 font-medium mt-0.5">
                                        Registra tu asistencia para que el docente te asigne un equipo.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    {/* Input: Nombre Completo */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-BlueDark-950">
                                            Tu Nombre Completo <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                <Users size={16} />
                                            </div>
                                            <input
                                                type="text"
                                                value={studentName}
                                                onChange={(e) => setStudentName(e.target.value)}
                                                placeholder="Ej. Juan Pérez"
                                                className="w-full bg-[#fcfbfa] border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-BlueDark-700 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* Input: Código de la Sala */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-BlueDark-950">
                                            Código de la Sala <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                                <Hash size={16} />
                                            </div>
                                            <input
                                                type="text"
                                                value={roomCode}
                                                onChange={(e) => setRoomCode(e.target.value)}
                                                placeholder="FIFO-000"
                                                className="w-full bg-[#fcfbfa] border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium focus:outline-none focus:border-BlueDark-700 transition-colors uppercase"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="w-full py-4 text-sm font-bold bg-BlueDark-950 hover:bg-BlueDark-950/90 text-white flex justify-center items-center gap-2 rounded-xl transition-all shadow-sm"
                            >
                                <ArrowRight size={16} />
                                <span>Ingresar a la Fila</span>
                            </button>
                        </div>
                    </div>

                </div>
            </main>

            {/* FOOTER */}
            <footer className="py-6 text-center text-[10px] text-gray-400 font-medium">
                © {new Date().getFullYear()} SpinTeam. Todos los derechos reservados.
            </footer>
        </div>
    );
}