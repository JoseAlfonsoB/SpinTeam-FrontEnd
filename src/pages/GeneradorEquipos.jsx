import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LogOut, Users, Settings, Plus, X, Hash } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';

export default function GeneradorEquipos() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Estados para el formulario del nuevo modal
    const [roomName, setRoomName] = useState('');
    const [teamCount, setTeamCount] = useState('4');
    const [selectionMethod, setSelectionMethod] = useState('FIFO');

    // Datos simulados idénticos al diseño autorizado por tu equipo
    const [rooms, setRooms] = useState([
        {
            id: 1,
            title: 'Sala de Matemáticas Avanzadas',
            code: 'A7K92X',
            students: 20,
            perTeam: 4,
            status: 'Activa'
        },
        {
            id: 2,
            title: 'Laboratorio de Ciencias',
            code: 'B3M85Y',
            students: 18,
            perTeam: 3,
            status: 'Activa'
        },
        {
            id: 3,
            title: 'Taller de Escritura',
            code: 'P9Q14Z',
            students: 0,
            perTeam: 5,
            status: 'Inactiva'
        }
    ]);

    // Manejador para crear sala desde el modal
    const handleCreateRoomSubmit = (e) => {
        e.preventDefault();
        if (!roomName) return;

        const newRoom = {
            id: Date.now(),
            title: roomName,
            code: Math.random().toString(36).substring(2, 8).toUpperCase(),
            students: 0,
            perTeam: parseInt(teamCount) || 2,
            status: 'Activa'
        };

        setRooms([newRoom, ...rooms]);
        setRoomName('');
        setIsModalOpen(false); // Cierra el modal
    };

    return (
        <div className="min-h-screen bg-[#f6f5f1] font-sans text-BlueDark-950 flex flex-col justify-between relative select-none">

            {/* BARRA DE NAVEGACIÓN SUPERIOR (EDUSYNC) */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center sticky top-0 z-40">
                <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* Logotipo */}
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-BlueDark-950 tracking-tight">SpinTeam</span>
                    </div>

                    {/* Buscador Central */}
                    <div className="flex-1 max-w-md mx-0 sm:mx-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Search classrooms..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#f0f2f5] border border-transparent rounded-full py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:bg-white focus:border-gray-200 transition-all placeholder:text-gray-400"
                        />
                    </div>

                    {/* Perfil del Docente / Cierre */}
                    <div className="flex items-center justify-end gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-BlueDark-950 leading-tight">Hola!!! Lucio Hernandez</p>
                            <button
                                onClick={() => navigate('/select-role')}
                                className="text-[10px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 justify-end mt-0.5 transition-colors"
                            >
                                <LogOut size={10} /> Cerrar Sesión
                            </button>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                            alt="Avatar Docente"
                            className="w-9 height-9 rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL DEL DASHBOARD */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col space-y-10">

                {/* Título Central */}
                <div className="text-center relative">
                    <Title level={1} className="text-3xl md:text-4xl font-black text-BlueDark-950 tracking-tight inline-block relative pb-2">
                        Salas Creadas
                        <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-BlueDark-950 rounded-full"></span>
                    </Title>
                </div>

                {/* GRID DE LAS CLASES O SALAS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">

                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] p-6 md:p-8 flex flex-col justify-between space-y-6 transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
                        >
                            <div className="space-y-4">
                                {/* Encabezado de la Card: Título y Badge */}
                                <div className="flex justify-between items-start gap-3">
                                    <h3 className="text-lg md:text-xl font-bold text-BlueDark-950 leading-snug tracking-tight">
                                        {room.title}
                                    </h3>
                                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${room.status === 'Activa'
                                            ? 'bg-green-50 text-green-600'
                                            : 'bg-blue-50 text-blue-500'
                                        }`}>
                                        {room.status}
                                    </span>
                                </div>

                                {/* Código de la Sala */}
                                <p className="text-xs text-gray-400 font-bold tracking-wide flex items-center gap-1 uppercase">
                                    🔑 CÓDIGO: <span className="text-BlueDark-950 font-black">{room.code}</span>
                                </p>

                                {/* Indicadores Estadísticos */}
                                <div className="space-y-2.5 pt-2">
                                    <div className="flex items-center gap-2.5 text-xs text-gray-500 font-medium">
                                        <Users size={15} className="text-gray-400" />
                                        <span><strong className="text-BlueDark-950 font-bold">{room.students}</strong> alumnos conectados</span>
                                    </div>
                                    <div className="flex items-center gap-2.5 text-xs text-gray-500 font-medium">
                                        <Users size={15} className="text-gray-400" />
                                        <span><strong className="text-BlueDark-950 font-bold">{room.perTeam}</strong> integrantes por equipo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Acciones de la Tarjeta */}
                            <div className="flex items-center gap-2 pt-2">
                                <button
                                    onClick={() => navigate(`/sala/${room.code}`)} // ✨ Redirecciona a la siguiente pantalla
                                    disabled={room.status === 'Inactiva'}
                                    className={`flex-1 py-3 text-xs font-bold text-white rounded-xl transition-all shadow-sm flex justify-center items-center ${room.status === 'Inactiva'
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-BlueDark-950 hover:bg-BlueDark-950/90'
                                        }`}
                                >
                                    Ingresar
                                </button>
                                <button className="p-3 text-gray-400 border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-BlueDark-950 transition-colors">
                                    <Settings size={14} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* TARJETA DISCRETA / ACCESO RÁPIDO ALTERNATIVO PARA CREAR */}
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="bg-transparent rounded-[2rem] border-2 border-dashed border-gray-300/80 p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group hover:border-BlueDark-700 transition-all min-h-[250px]"
                    >
                        <div className="bg-white border border-gray-200 text-gray-400 p-3 rounded-full shadow-sm group-hover:scale-105 transition-transform group-hover:text-BlueDark-950 group-hover:border-transparent">
                            <Plus size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 group-hover:text-BlueDark-950 transition-colors">Crear Nueva Sala</p>
                            <p className="text-[11px] text-gray-400 max-w-[180px] mx-auto mt-0.5">Configura un nuevo espacio de aprendizaje para tus estudiantes.</p>
                        </div>
                    </div>

                </div>
            </main>

            {/* BOTÓN FLOTANTE PRINCIPAL (FAB) - ENCARGADO DE ABRIR EL MODAL */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-BlueDark-950 text-white p-4 rounded-full shadow-xl hover:bg-BlueDark-950/90 hover:scale-105 transition-all z-50 flex items-center justify-center border border-white/10"
            >
                <Plus size={24} strokeWidth={2.5} />
            </button>

            {/* MODAL CONFIGURADO DE CREACIÓN DE SALA */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-BlueDark-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-10 w-full max-w-md flex flex-col relative animate-scale-up">

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-BlueDark-950 transition-colors"
                        >
                            <X size={18} />
                        </button>

                        <div className="mb-6">
                            <Title level={2} className="text-xl md:text-2xl font-black text-BlueDark-950">
                                Crear Nueva Sala
                            </Title>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">
                                Establece las reglas de ordenamiento para tu grupo.
                            </p>
                        </div>

                        <form onSubmit={handleCreateRoomSubmit} className="space-y-5">
                            {/* Input: Nombre */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-BlueDark-950 pl-0.5">
                                    Nombre de la Sala / Clase <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <Users size={15} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={roomName}
                                        onChange={(e) => setRoomName(e.target.value)}
                                        placeholder="Ej. Estructuras de Datos"
                                        className="w-full bg-[#fcfbfa] border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-BlueDark-700 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Input: Cantidad de Equipos */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-BlueDark-950 pl-0.5">
                                    Integrantes por Equipo <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <Hash size={15} />
                                    </div>
                                    <input
                                        type="number"
                                        min="1"
                                        value={teamCount}
                                        onChange={(e) => setTeamCount(e.target.value)}
                                        className="w-full bg-[#fcfbfa] border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-BlueDark-700 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Selector Métodos */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-BlueDark-950 pl-0.5">
                                    Método de Selección
                                </label>
                                <div className="grid grid-cols-2 gap-2 bg-[#f5f4f0] p-1 rounded-xl border border-gray-200">
                                    <button
                                        type="button"
                                        onClick={() => setSelectionMethod('FIFO')}
                                        className={`py-2 rounded-lg text-[11px] font-bold transition-all ${selectionMethod === 'FIFO'
                                                ? 'bg-BlueDark-950 text-white shadow-sm'
                                                : 'text-gray-500'
                                            }`}
                                    >
                                        Fila FIFO
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectionMethod('Aleatorio')}
                                        className={`py-2 rounded-lg text-[11px] font-bold transition-all ${selectionMethod === 'Aleatorio'
                                                ? 'bg-BlueDark-950 text-white shadow-sm'
                                                : 'text-gray-500'
                                            }`}
                                    >
                                        Aleatorio
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="primary"
                                iconRight={Plus}
                                className="w-full py-3 bg-BlueDark-950 text-white text-xs font-bold rounded-xl mt-2 flex justify-center items-center gap-1 shadow-md"
                            >
                                Registrar y Habilitar
                            </Button>
                        </form>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            <footer className="py-6 text-center text-[10px] text-gray-400 font-medium border-t border-gray-100 bg-white/40">
                © {new Date().getFullYear()} EduSync Premium Management. Todos los derechos reservados.
            </footer>
        </div>
    );
}