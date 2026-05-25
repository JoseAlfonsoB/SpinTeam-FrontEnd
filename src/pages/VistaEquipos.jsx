import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bell, Settings, LogOut, Users, Plus, ShieldAlert } from 'lucide-react';
import Title from '../components/atoms/Title';

export default function VistaEquipos() {
    const navigate = useNavigate();
    const { codigoSala } = useParams(); // Por si deseas capturar el código dinámico de la URL

    // Información de cabecera de la sala según el diseño aprobado
    const [salaInfo] = useState({
        nombre: 'Sistemas Distribuidos',
        codigo: codigoSala || 'ABC123',
        inscritos: 20
    });

    // Estado inicial de los equipos y sus integrantes reflejados en el mockup
    const [equipos, setEquipos] = useState([
        {
            id: 1,
            nombre: 'Equipo 1',
            maxCapacidad: 4,
            integrantes: [
                { id: 'lj', nombre: 'Luis José', iniciales: 'LJ' },
                { id: 'ja', nombre: 'Jose Alfonso', iniciales: 'JA' },
                { id: 'ib', nombre: 'Ismael Bibiano', iniciales: 'IB' },
                { id: 'jt', nombre: 'Josue Terrazas', iniciales: 'JT' }
            ]
        },
        {
            id: 2,
            nombre: 'Equipo 2',
            maxCapacidad: 4,
            integrantes: [
                { id: 'lj', nombre: 'Luis José', iniciales: 'LJ' },
                { id: 'ja', nombre: 'Jose Alfonso', iniciales: 'JA' },
                { id: 'ib', nombre: 'Ismael Bibiano', iniciales: 'IB' },
                { id: 'jt', nombre: 'Josue Terrazas', iniciales: 'JT' }
            ]
        },
        {
            id: 3,
            nombre: 'Equipo 3',
            maxCapacidad: 4,
            integrantes: [
                { id: 'lj', nombre: 'Luis José', iniciales: 'LJ' },
                { id: 'ja', nombre: 'Jose Alfonso', iniciales: 'JA' },
                { id: 'ib', nombre: 'Ismael Bibiano', iniciales: 'IB' },
                { id: 'jt', nombre: 'Josue Terrazas', iniciales: 'JT' }
            ]
        }
    ]);

    // Función simulada para agregar un nuevo equipo vacío o autogenerado
    const handleCrearEquipo = () => {
        const nuevoId = equipos.length + 1;
        const nuevoEquipo = {
            id: nuevoId,
            nombre: `Equipo ${nuevoId}`,
            maxCapacidad: 4,
            integrantes: []
        };
        setEquipos([...equipos, nuevoEquipo]);
    };

    return (
        <div className="min-h-screen bg-[#f6f5f1] font-sans text-BlueDark-950 flex flex-col justify-between select-none">

            {/* 1. BARRA DE NAVEGACIÓN SUPERIOR (EDUMANAGE) */}
            <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center sticky top-0 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    {/* Brand & Menú horizontal de navegación */}
                    <div className="flex items-center gap-8">
                        <span className="text-xl font-black text-BlueDark-950 tracking-tight">EduManage</span>
                        <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-gray-400">
                            <a href="#" className="hover:text-BlueDark-950 transition-colors">Mis Equipos</a>
                            <a href="#" className="text-BlueDark-950 relative pb-1">
                                Salas
                                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-BlueDark-950 rounded-full"></span>
                            </a>
                            <a href="#" className="hover:text-BlueDark-950 transition-colors">Reportes</a>
                            <a href="#" className="hover:text-BlueDark-950 transition-colors">Calendario</a>
                        </nav>
                    </div>

                    {/* Controles de Perfil y Notificaciones */}
                    <div className="flex items-center justify-end gap-5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <button className="hover:text-BlueDark-950 transition-colors p-1.5 hover:bg-gray-50 rounded-lg">
                                <Bell size={16} />
                            </button>
                            <button className="hover:text-BlueDark-950 transition-colors p-1.5 hover:bg-gray-50 rounded-lg">
                                <Settings size={16} />
                            </button>
                        </div>

                        <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>

                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-BlueDark-950 leading-tight">Hola!!! Lucio Hernandez</p>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Docente Titular</span>
                            </div>
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                                alt="Avatar Docente"
                                className="w-8 h-8 rounded-full object-cover border border-gray-150"
                            />
                            <button
                                onClick={() => navigate('/generator')}
                                className="ml-2 bg-BlueDark-950 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-sm"
                                title="Volver a Salas"
                            >
                                <LogOut size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. CONTENIDO PRINCIPAL */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col space-y-8">

                {/* Encabezado Dinámico: Botón Volver + Título + Bloque Resumen */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                    {/* Lado Izquierdo: Botón Atrás y Título de Vista */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/generator')}
                            className="bg-white border border-gray-200 text-gray-500 p-2.5 rounded-full hover:text-BlueDark-950 hover:bg-gray-50 shadow-sm transition-all"
                        >
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <Title level={1} className="text-2xl font-black text-BlueDark-950 tracking-tight">
                                Vista de Equipos
                            </Title>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">
                                Organización y seguimiento de grupos de trabajo.
                            </p>
                        </div>
                    </div>

                    {/* Lado Derecho: Bloque Consola de Resumen de Sala */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] px-6 py-3 flex items-center divide-x divide-gray-150 gap-6">
                        <div className="text-left">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Sala</span>
                            <span className="text-xs font-black text-BlueDark-950">{salaInfo.nombre}</span>
                        </div>
                        <div className="text-left pl-6">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Código</span>
                            <span className="text-xs font-black text-blue-600 tracking-wide">{salaInfo.codigo}</span>
                        </div>
                        <div className="text-left pl-6">
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Inscritos</span>
                            <span className="text-xs font-black text-BlueDark-950">{salaInfo.inscritos} alumnos</span>
                        </div>
                    </div>
                </div>

                {/* 3. GRID DE TARJETAS DE GRUPOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pt-2">

                    {equipos.map((equipo) => (
                        <div
                            key={equipo.id}
                            className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col justify-between"
                        >
                            {/* Cabecera Azul de la Card */}
                            <div className="bg-BlueDark-950 text-white px-6 py-4 flex justify-between items-center">
                                <span className="text-sm font-bold tracking-tight">{equipo.nombre}</span>
                                <div className="bg-white/10 p-1.5 rounded-lg text-white/80">
                                    <Users size={14} />
                                </div>
                            </div>

                            {/* Cuerpo: Lista de Integrantes */}
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                                <div className="space-y-3.5">
                                    {equipo.integrantes.length > 0 ? (
                                        equipo.integrantes.map((integrante, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center gap-3 py-1 animate-fade-in"
                                            >
                                                {/* Iniciales en Círculo */}
                                                <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[11px] font-black text-blue-600 shadow-sm">
                                                    {integrante.iniciales}
                                                </div>
                                                {/* Nombre del Estudiante */}
                                                <span className="text-xs font-bold text-gray-600 tracking-tight">
                                                    {integrante.nombre}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-6 text-center text-gray-300 space-y-1">
                                            <ShieldAlert size={20} strokeWidth={1.5} />
                                            <p className="text-[11px] font-semibold">Sin alumnos asignados</p>
                                        </div>
                                    )}
                                </div>

                                {/* Base de la Card: Contador de Capacidad */}
                                <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400">
                                    <span className="text-[10px] uppercase tracking-wider font-semibold">Capacidad</span>
                                    <span className="bg-BlueDark-950 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black">
                                        {equipo.integrantes.length}/{equipo.maxCapacidad}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* TARJETA DE ACCIÓN: CREAR NUEVO EQUIPO */}
                    <div
                        onClick={handleCrearEquipo}
                        className="bg-transparent rounded-[2rem] border-2 border-dashed border-gray-300/80 p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group hover:border-BlueDark-700 transition-all min-h-[300px]"
                    >
                        <div className="bg-white border border-gray-200 text-gray-400 p-3 rounded-full shadow-sm group-hover:scale-105 transition-transform group-hover:text-BlueDark-950 group-hover:border-transparent">
                            <Plus size={18} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 group-hover:text-BlueDark-950 transition-colors">
                                Crear Nuevo Equipo
                            </p>
                            <p className="text-[11px] text-gray-400 max-w-[180px] mx-auto mt-0.5 leading-relaxed">
                                Asigna alumnos automáticamente o manualmente.
                            </p>
                        </div>
                    </div>

                </div>
            </main>

            {/* FOOTER */}
            <footer className="py-5 text-center text-[10px] text-gray-400 font-medium border-t border-gray-100 bg-white/40 mt-12">
                © {new Date().getFullYear()} EduManage Co. Todos los derechos reservados.
            </footer>
        </div>
    );
}