import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LogOut, Users, Plus, X } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';

export default function EquiposUnidos() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [roomCode, setRoomCode] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Al enviar el código, navegamos a la vista de la sala
    const handleJoinRoomSubmit = (e) => {
        e.preventDefault();
        if (!roomCode.trim()) return;
        
        setIsModalOpen(false);
        // Redirige a la ruta de alumno con el código ingresado
        navigate(`/salas/${roomCode.trim().toUpperCase()}`);
    };

    return (
        <div className="min-h-screen bg-[#f6f5f1] font-sans text-BlueDark-950 flex flex-col justify-between relative select-none">
            {/* BARRA SUPERIOR */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center sticky top-0 z-40">
                <div className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black text-BlueDark-950 tracking-tight">SpinTeam</span>
                    </div>

                    <div className="flex-1 max-w-md mx-0 sm:mx-8 relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar salas unidas..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#f0f2f5] border border-transparent rounded-full py-2 pl-10 pr-4 text-xs font-medium focus:outline-none focus:bg-white focus:border-gray-200 transition-all placeholder:text-gray-400"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-black text-BlueDark-950 leading-tight">
                                {user ? (user.nombre ? `${user.nombre} ${user.apellido || ''}` : user.email) : 'Alumno'}
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">{user?.email}</p>
                        </div>
                        {user?.fotoUrl ? (
                            <img src={user.fotoUrl} alt="Avatar" className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-BlueDark-950 text-white flex items-center justify-center font-black text-xs uppercase">
                                {user?.nombre ? user.nombre.charAt(0) : '?'}
                            </div>
                        )}
                        <button onClick={handleLogout} className="ml-2 bg-BlueDark-950 text-white p-2 rounded-xl hover:bg-red-600 transition-colors shadow-sm">
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL */}
            <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-12 flex flex-col space-y-10">
                <div className="text-center relative">
                    <Title level={1} className="text-3xl md:text-4xl font-black text-BlueDark-950 tracking-tight inline-block relative pb-2">
                        Salas Unidas
                        <span className="absolute bottom-0 left-1/4 right-1/4 h-[3px] bg-BlueDark-950 rounded-full"></span>
                    </Title>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                    {/* Botón grande para unirse a nueva sala */}
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="bg-transparent rounded-[2rem] border-2 border-dashed border-gray-300/80 p-8 flex flex-col items-center justify-center text-center space-y-3 cursor-pointer group hover:border-BlueDark-700 transition-all min-h-[250px]"
                    >
                        <div className="bg-white border border-gray-200 text-gray-400 p-3 rounded-full shadow-sm group-hover:scale-105 transition-transform group-hover:text-BlueDark-950 group-hover:border-transparent">
                            <Plus size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-gray-400 group-hover:text-BlueDark-950 transition-colors">Unirse a una Sala</p>
                            <p className="text-[11px] text-gray-400 max-w-[180px] mx-auto mt-0.5">Ingresa el código proporcionado por tu profesor.</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* BOTÓN FLOTANTE */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-6 right-6 bg-BlueDark-950 text-white p-4 rounded-full shadow-xl hover:bg-BlueDark-950/90 hover:scale-105 transition-all z-50 flex items-center justify-center"
            >
                <Plus size={24} strokeWidth={2.5} />
            </button>

            {/* MODAL PARA INGRESAR CÓDIGO */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-BlueDark-950/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-8 md:p-10 w-full max-w-md flex flex-col relative animate-scale-up">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-BlueDark-950 transition-colors">
                            <X size={18} />
                        </button>

                        <div className="mb-6">
                            <Title level={2} className="text-xl md:text-2xl font-black text-BlueDark-950">
                                Unirse a una Sala
                            </Title>
                        </div>

                        <form onSubmit={handleJoinRoomSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-BlueDark-950 pl-0.5">
                                    Código de la Sala <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                                        <Users size={15} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={roomCode}
                                        onChange={(e) => setRoomCode(e.target.value)}
                                        placeholder="Ej. A7K92X"
                                        className="w-full bg-[#fcfbfa] border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-xs font-semibold focus:outline-none focus:border-BlueDark-700 transition-colors uppercase"
                                    />
                                </div>
                            </div>

                            <Button type="submit" variant="primary" className="w-full py-3 bg-BlueDark-950 text-white text-xs font-bold rounded-xl mt-2 flex justify-center items-center shadow-md">
                                Unirse a la Sala
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}