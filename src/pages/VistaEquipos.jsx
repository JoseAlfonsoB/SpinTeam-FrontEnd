import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bell, Settings, LogOut, Users, Plus, ShieldAlert, Copy, Check } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';
import { useRoom } from '../context/RoomContext';
import { getSessionByCodeService } from '../services/api';

export default function VistaEquipos() {
    const navigate = useNavigate();
    const { codigoSala } = useParams();
    const { user } = useAuth();
    
    // Obtenemos los estados reales y las funciones del Contexto de Sockets
    const { students, teams, generateTeams, connectToRoomSocket } = useRoom();

    const [salaInfo, setSalaInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [copiado, setCopiado] = useState(false);

    useEffect(() => {
        const cargarDetallesSala = async () => {
            try {
                setLoading(true);
                const data = await getSessionByCodeService(codigoSala);
                setSalaInfo(data);
                
                // Conectar al socket como docente
                if (user) {
                    connectToRoomSocket(codigoSala, user, 'docente');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('No se pudo encontrar la sala.');
                navigate('/generator');
            } finally {
                setLoading(false);
            }
        };

        if (codigoSala) cargarDetallesSala();
    }, [codigoSala, navigate, user]);

    const handleCopiarCodigo = () => {
        if (salaInfo?.code) {
            navigator.clipboard.writeText(salaInfo.code);
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        }
    };

    // Función auxiliar para extraer iniciales de los alumnos
    const getInitials = (name) => {
        if (!name) return '??';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#f6f5f1] flex items-center justify-center font-sans">
                <p className="text-sm font-bold text-gray-500 animate-pulse">Abriendo sala de espera...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f6f5f1] font-sans text-BlueDark-950 flex flex-col justify-between select-none">
            {/* 1. BARRA DE NAVEGACIÓN SUPERIOR */}
            <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center sticky top-0 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <span className="text-xl font-black text-BlueDark-950 tracking-tight">SpinTeam</span>
                    </div>

                    <div className="flex items-center justify-end gap-5">
                        <div className="flex items-center gap-3 text-gray-400">
                            <button className="hover:text-BlueDark-950 transition-colors p-1.5 hover:bg-gray-50 rounded-lg"><Bell size={16} /></button>
                            <button className="hover:text-BlueDark-950 transition-colors p-1.5 hover:bg-gray-50 rounded-lg"><Settings size={16} /></button>
                        </div>
                        <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-BlueDark-950 leading-tight">
                                    Hola!!! {user?.nombre ? `${user.nombre} ${user.apellido || ''}` : 'Docente'}
                                </p>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Docente Titular</span>
                            </div>
                            {user?.fotoUrl ? (
                                <img src={user.fotoUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-gray-150" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-BlueDark-950 text-white flex items-center justify-center font-black text-xs uppercase">
                                    {user?.nombre ? user.nombre.charAt(0) : '?'}
                                </div>
                            )}
                            <button onClick={() => navigate('/generator')} className="ml-2 bg-BlueDark-950 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-sm">
                                <LogOut size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. CONTENIDO PRINCIPAL */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/generator')} className="bg-white border border-gray-200 text-gray-500 p-2.5 rounded-full hover:text-BlueDark-950 hover:bg-gray-50 shadow-sm transition-all">
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <Title level={1} className="text-2xl font-black text-BlueDark-950 tracking-tight">Vista de Equipos</Title>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">Organización y seguimiento de grupos de trabajo.</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3 flex items-center divide-x divide-gray-150 gap-4 overflow-hidden max-w-full">
                            <div className="text-left px-2 flex-shrink min-w-0 max-w-[150px] sm:max-w-[250px]">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Sala</span>
                                <span className="text-xs font-black text-BlueDark-950 truncate block" title={salaInfo?.title}>
                                    {salaInfo?.title}
                                </span>
                            </div>
                            
                            <div className="text-left px-4 flex-shrink-0 flex items-center gap-3">
                                <div>
                                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Código</span>
                                    <span className="text-xs font-black text-blue-600 tracking-wide">{salaInfo?.code}</span>
                                </div>
                                <button onClick={handleCopiarCodigo} className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                                    {copiado ? <Check size={14} /> : <Copy size={14} />}
                                </button>
                            </div>

                            <div className="text-left pl-4 pr-2 flex-shrink-0">
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Inscritos</span>
                                <span className="text-xs font-black text-BlueDark-950">{students.length} alumnos</span>
                            </div>
                        </div>

                        {/* BOTÓN PARA DISPARAR gRPC (Solo aparece si no hay equipos formados) */}
                        {user?.role === 'docente' && teams.length === 0 && (
                            <Button
                                variant="primary"
                                icon={Users}
                                onClick={() => generateTeams(codigoSala)}
                                disabled={students.length === 0}
                                className="h-full py-4 px-6 bg-BlueDark-950 text-white rounded-2xl shadow-md whitespace-nowrap disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Generar Equipos
                            </Button>
                        )}
                    </div>
                </div>

                {/* 3. ZONA DINÁMICA DE RENDERIZADO */}
                {teams.length === 0 ? (
                    // PANTALLA DE ESPERA (Se muestra antes de presionar el botón)
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-gray-400 space-y-3">
                        <Users size={48} className="text-gray-200" />
                        <p className="text-sm font-bold">Esperando para procesar...</p>
                        <p className="text-xs max-w-[250px] text-center">Cuando los alumnos estén listos en la sala, presiona "Generar Equipos" en la parte superior.</p>
                        
                        {/* Pequeña previsualización de alumnos conectados */}
                        {students.length > 0 && (
                            <div className="mt-4 flex gap-2 flex-wrap justify-center max-w-lg">
                                {students.map((s, i) => (
                                    <span key={i} className="text-[10px] bg-blue-50 text-blue-600 font-bold px-2 py-1 rounded-md border border-blue-100">
                                        {s.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    // GRID DE EQUIPOS MAQUETADO (Se muestra después de procesar por gRPC)
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pt-2">
                        {teams.map((equipo, index) => (
                            <div key={equipo.team_id || index} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
                                <div className="bg-BlueDark-950 text-white px-6 py-4 flex justify-between items-center">
                                    <span className="text-sm font-bold tracking-tight">Equipo {equipo.team_id || index + 1}</span>
                                    <div className="bg-white/10 p-1.5 rounded-lg text-white/80"><Users size={14} /></div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                                    <div className="space-y-3.5">
                                        {equipo.members && equipo.members.length > 0 ? (
                                            equipo.members.map((integrante, i) => (
                                                <div key={integrante.id || i} className="flex items-center gap-3 py-1 animate-fade-in">
                                                    <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[11px] font-black text-blue-600 shadow-sm">
                                                        {getInitials(integrante.name)}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-600 tracking-tight">{integrante.name}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-6 text-center text-gray-300 space-y-1">
                                                <ShieldAlert size={20} strokeWidth={1.5} />
                                                <p className="text-[11px] font-semibold">Sin alumnos asignados</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400">
                                        <span className="text-[10px] uppercase tracking-wider font-semibold">Capacidad</span>
                                        <span className="bg-BlueDark-950 text-white px-2.5 py-0.5 rounded-full text-[10px] font-black">
                                            {equipo.members?.length || 0}/{salaInfo?.perTeam || 4}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            <footer className="py-5 text-center text-[10px] text-gray-400 font-medium border-t border-gray-100 bg-white/40 mt-12">
                © {new Date().getFullYear()} EduManage Co. Todos los derechos reservados.
            </footer>
        </div>
    );
}