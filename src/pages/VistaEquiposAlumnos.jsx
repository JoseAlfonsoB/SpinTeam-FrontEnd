import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Bell, Settings, LogOut, Users, ShieldAlert } from 'lucide-react';
import Title from '../components/atoms/Title';
import { useAuth } from '../context/AuthContext';
import { useRoom } from '../context/RoomContext';
import { getSessionByCodeService } from '../services/api';

export default function VistaEquiposAlumnos() {
    const navigate = useNavigate();
    const { codigoSala } = useParams();
    const { user } = useAuth();
    
    // Obtenemos los equipos directamente del contexto en tiempo real
    const { teams, joinRoom } = useRoom();

    const [salaInfo, setSalaInfo] = useState(null);

    // Conectar el socket y obtener detalles básicos de la sala
    useEffect(() => {
        if (user && codigoSala) {
            joinRoom(user, codigoSala);
            
            // Opcional: Obtener detalles de la sala para saber la capacidad máxima
            const cargarDetallesSala = async () => {
                try {
                    const data = await getSessionByCodeService(codigoSala);
                    setSalaInfo(data);
                } catch (error) {
                    console.error('Error al cargar datos básicos de sala.');
                }
            };
            cargarDetallesSala();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, codigoSala]);

    const getInitials = (name) => {
        if (!name) return '??';
        const parts = name.trim().split(/\s+/);
        if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
        return name.substring(0, 2).toUpperCase();
    };

    return (
        <div className="min-h-screen bg-[#f6f5f1] font-sans text-BlueDark-950 flex flex-col justify-between select-none">
            
            <header className="bg-white border-b border-gray-100 px-6 py-3.5 flex items-center sticky top-0 z-40 shadow-[0_2px_10px_rgba(0,0,0,0.01)]">
                <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-8">
                        <span className="text-xl font-black text-BlueDark-950 tracking-tight">SpinTeam</span>
                    </div>

                    <div className="flex items-center justify-end gap-5">
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs font-black text-BlueDark-950 leading-tight">
                                    {user?.nombre ? `${user.nombre} ${user.apellido || ''}` : 'Alumno'}
                                </p>
                                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">Alumno Titular</span>
                            </div>
                            {user?.fotoUrl ? (
                                <img src={user.fotoUrl} alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-gray-150" />
                            ) : (
                                <div className="w-8 h-8 rounded-full bg-BlueDark-950 text-white flex items-center justify-center font-black text-xs uppercase">
                                    {user?.nombre ? user.nombre.charAt(0) : '?'}
                                </div>
                            )}
                            <button onClick={() => navigate('/unidas')} className="ml-2 bg-BlueDark-950 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-sm">
                                <LogOut size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/unidas')} className="bg-white border border-gray-200 text-gray-500 p-2.5 rounded-full hover:text-BlueDark-950 hover:bg-gray-50 shadow-sm transition-all">
                            <ArrowLeft size={16} />
                        </button>
                        <div>
                            <Title level={1} className="text-2xl font-black text-BlueDark-950 tracking-tight">
                                Vista de Equipos
                            </Title>
                            <p className="text-xs text-gray-400 font-medium mt-0.5">
                                Código de tu sala: <strong className="text-BlueDark-950">{codigoSala}</strong>
                            </p>
                        </div>
                    </div>
                </div>

                {/* RENDERIZADO DINÁMICO */}
                {teams.length === 0 ? (
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-gray-400 space-y-3">
                        <Users size={48} className="text-gray-200 animate-pulse" />
                        <p className="text-sm font-bold">Esperando al Docente...</p>
                        <p className="text-xs max-w-[250px] text-center">Tus equipos aparecerán aquí automáticamente en cuanto el profesor termine la asignación.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch pt-2">
                        {teams.map((equipo, index) => (
                            <div key={equipo.team_id || index} className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col justify-between">
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
        </div>
    );
}