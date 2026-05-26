import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';

export default function LoginDocente() {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!nombre || !email || !password) {
            setError('Por favor, rellena todos los campos para el registro del docente.');
            return;
        }

        try {
            await register(nombre, email, password);
            // Flujo correcto: Tras autenticarse como docente va al generador de salas
            navigate('/generator');
        } catch (err) {
            setError(err.message || 'Error al registrar el docente.');
        }
    };

    return (
        <div className="min-h-screen bg-[#f6f5f1] font-sans text-BlueDark-950 flex flex-col justify-between items-center p-4 relative overflow-hidden select-none">

            {/* ELEMENTOS DE FONDO FLOTANTES (DECORATIVOS SEGÚN EL DISEÑO) */}
            <div className="absolute top-12 left-12 opacity-20 pointer-events-none hidden md:block text-gray-400">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
            </div>
            <div className="absolute bottom-12 right-12 opacity-20 pointer-events-none hidden md:block text-gray-400">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
            </div>

            {/* CONTENEDOR CENTRAL DE LA TARJETA */}
            <main className="flex-1 flex items-center justify-center w-full z-10 py-10">
                <div className="bg-white rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 p-8 md:p-12 w-full max-w-[480px] flex flex-col items-center animate-fade-in">

                    {/* ICONO IDENTIFICADOR DE DOCENTE */}
                    <div className="bg-BlueDark-950 text-white p-4 rounded-2xl shadow-md mb-5">
                        <GraduationCap size={28} strokeWidth={1.5} />
                    </div>

                    {/* ENCABEZADOS DE TEXTO */}
                    <div className="text-center space-y-1 mb-8">
                        <Title level={2} className="text-xl md:text-2xl font-bold text-BlueDark-950 tracking-tight">
                            Registro del usuario/docente
                        </Title>
                        <p className="text-xs md:text-sm text-gray-400 font-medium">
                            Únete a nuestra plataforma de gestión académica
                        </p>
                    </div>

                    {/* ALERTA DE ERROR */}
                    {error && (
                        <div className="w-full mb-5 p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-semibold rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    {/* FORMULARIO DE ENTRADA */}
                    <form onSubmit={handleSubmit} className="w-full space-y-5">

                        {/* Campo: Nombre */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5 pl-0.5">
                                <User size={14} className="text-gray-500" /> Nombre
                            </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                placeholder="Tu nombre completo"
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-BlueDark-700 transition-colors placeholder:text-gray-300 font-medium"
                            />
                        </div>

                        {/* Campo: Correo Electrónico */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5 pl-0.5">
                                <Mail size={14} className="text-gray-500" /> Correo Electrónico
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="ejemplo@equipe.com"
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-BlueDark-700 transition-colors placeholder:text-gray-300 font-medium"
                            />
                        </div>

                        {/* Campo: Contraseña */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5 pl-0.5">
                                <Lock size={14} className="text-gray-500" /> Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-BlueDark-700 transition-colors placeholder:text-gray-300 font-medium"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-BlueDark-700 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* BOTÓN REGISTRAR / ENTRAR */}
                        <Button
                            type="submit"
                            variant="primary"
                            iconRight={ArrowRight}
                            className="w-full py-3.5 bg-BlueDark-950 text-white rounded-xl text-sm font-bold flex justify-center items-center gap-2 shadow-sm mt-2"
                        >
                            Crear Cuenta
                        </Button>
                    </form>

                    {/* REDIRECCIÓN DE PIE DE FORMULARIO */}
                    <div className="text-center mt-6 text-xs text-gray-400 font-semibold">
                        ¿Ya tienes una cuenta?{' '}
                        <a href="#" className="text-BlueDark-950 hover:underline font-bold">
                            Inicia Sesión
                        </a>
                    </div>

                    {/* ENLACES LEGALES INTERNOS DE LA TARJETA */}
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-semibold mt-6 pt-4 border-t border-gray-100 w-full justify-center">
                        <a href="#" className="hover:text-BlueDark-950">Privacidad</a>
                        <span>•</span>
                        <a href="#" className="hover:text-BlueDark-950">Términos</a>
                        <span>•</span>
                        <a href="#" className="hover:text-BlueDark-950">Ayuda</a>
                    </div>

                </div>
            </main>

            {/* FOOTER GENERAL */}
            <footer className="py-4 text-center text-[10px] text-gray-400 font-medium max-w-md px-4 leading-relaxed">
                © {new Date().getFullYear()} EquipePremium Management. Espacios de trabajo inteligentes para equipos de alto rendimiento.
            </footer>
        </div>
    );
}