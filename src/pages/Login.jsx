import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ArrowLeft, Eye, Users } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import { useAuth } from '../context/AuthContext';

// Nota: Para la imagen de la izquierda, usaremos un placeholder de alta resolución de una oficina moderna.
// En producción, reemplázala por tu archivo de imagen real (ej: import officeImage from '../assets/office.jpg';)

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('error') === 'google_auth_failed') {
            setError('La autenticación con Google falló. Inténtalo de nuevo.');
        } else if (params.get('error') === 'account_not_found') {
            setError('Esta cuenta no existe. Por favor, regístrate.');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Por favor, rellena todos los campos requeridos.');
            return;
        }

        try {
            await login(email, password);
            navigate('/dashboard'); // Ajusta esta ruta a tu dashboard principal
        } catch (err) {
            setError(err.message || 'Error al iniciar sesión. Verifica tus credenciales.');
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-BlueDark-950 flex">

            {/* COLUMNA IZQUIERDA: IMAGEN Y TEXTO DE MARCA */}
            <div className="hidden lg:flex lg:w-[45%] xl:w-1/2 bg-BlueDark-950 p-12 flex-col justify-between relative overflow-hidden">
                {/* Imagen de fondo de oficina (placeholder de alta calidad) */}
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1600&auto=format&fit=crop"
                    alt="Modern office collaborative space"
                    className="absolute inset-0 w-full h-full object-cover opacity-20 scale-105 animate-subtle-zoom"
                />

                {/* Logo superior */}
                <div className="flex items-center gap-3 relative z-10 text-white">
                    <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-sm">
                        <Users size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">SpinTeam.</span>
                </div>

                {/* Texto de cierre inferior */}
                <div className="relative z-10 space-y-4 max-w-md">
                    <Title level={1} className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Empoderando <br />
                        <span className="text-white/80">Equipos Modernos</span>
                    </Title>
                    <p className="text-white/60 text-lg leading-relaxed">
                        La plataforma definitiva para la gestión de flujos de trabajo en tiempo real y colaboración fluida.
                    </p>
                </div>
            </div>

            {/* COLUMNA DERECHA: FORMULARIO DE LOGIN */}
            <div className="flex-1 flex flex-col justify-between py-8 px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24">

                {/* Navegación superior (Opcional, pero útil) */}
                <header className="flex items-center justify-between pb-8 border-b border-GrayBlue-100">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-GrayBlue-500 hover:text-BlueDark-950 transition-colors"
                    >
                        <ArrowLeft size={16} /> Regresar
                    </button>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-GrayBlue-500">¿No tienes cuenta?</span>
                        <button onClick={() => navigate('/register-role')} className="text-sm font-bold text-BlueDark-700 hover:underline">Regístrate</button>
                    </div>
                </header>

                {/* CONTENEDOR CENTRAL DEL FORMULARIO */}
                <main className="flex-1 flex items-center justify-center py-12">
                    <div className="w-full max-w-md space-y-9">

                        {/* Encabezado e Icono */}
                        <div className="space-y-3">
                            <div className="bg-GrayBlue-100/60 p-3 w-12 h-12 rounded-xl flex items-center justify-center text-BlueDark-950">
                                <Users size={24} />
                            </div>
                            <Title level={2} className="text-4xl font-black text-BlueDark-950">Iniciar Sesión</Title>
                            <p className="text-lg text-GrayBlue-500 max-w-xs">
                                Bienvenido de nuevo. Por favor, introduce tus credenciales.
                            </p>
                        </div>

                        {/* Formulario */}
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* ALERTA DE ERROR */}
                            {error && (
                                <div className="p-4 bg-red-50 border border-red-100 text-red-600 text-sm font-semibold rounded-xl text-center animate-shake">
                                    {error}
                                </div>
                            )}

                            {/* Campo: Correo Electrónico */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-BlueDark-800">
                                    Correo Electrónico
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ejemplo@universidad.com"
                                        className="w-full bg-white border border-GrayBlue-200 rounded-xl py-3.5 pl-4 pr-11 text-sm focus:outline-none focus:border-BlueDark-700 transition-colors placeholder:text-GrayBlue-300 shadow-inner-light"
                                    />
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-GrayBlue-300">
                                        <Mail size={18} />
                                    </div>
                                </div>
                            </div>

                            {/* Campo: Contraseña */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-semibold text-BlueDark-800">
                                        Contraseña
                                    </label>
                                    <a href="#" className="text-sm font-bold text-BlueDark-700 hover:underline">
                                        ¿La olvidaste?
                                    </a>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full bg-white border border-GrayBlue-200 rounded-xl py-3.5 pl-4 pr-11 text-sm focus:outline-none focus:border-BlueDark-700 transition-colors placeholder:text-GrayBlue-300 shadow-inner-light"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-GrayBlue-300 hover:text-BlueDark-700 transition-colors"
                                    >
                                        <Eye size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Botón de Envío */}
                            <Button
                                type="submit"
                                variant="primary"
                                iconRight={ArrowRight}
                                className="w-full py-4 mt-2 rounded-xl text-base font-bold uppercase tracking-widest shadow-lg"
                            >
                                Iniciar Sesión
                            </Button>
                        </form>

                        {/* Sección de Continuar con SSO */}
                        <div className="space-y-6">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-GrayBlue-100"></div>
                                </div>
                                <span className="relative z-10 bg-white px-4 text-sm font-bold text-GrayBlue-300 uppercase tracking-widest">
                                    O continuar con
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <a href={`${import.meta.env.VITE_API_URL}/api/auth/google?action=login`} 
                                className="flex items-center justify-center gap-3 py-3 px-4 border border-GrayBlue-200 rounded-xl bg-white hover:bg-GrayBlue-50 transition-colors text-BlueDark-950 shadow-sm">
                                    <img src="https://authjs.dev/img/providers/google.svg" alt="Google" className="w-5 h-5" />
                                    <span className="text-sm font-bold">Google</span>
                                </a>
                                <button className="flex items-center justify-center gap-3 py-3 px-4 border border-GrayBlue-200 rounded-xl bg-white hover:bg-GrayBlue-50 transition-colors text-BlueDark-950 shadow-sm">
                                    <Users size={20} className="text-GrayBlue-500" />
                                    <span className="text-sm font-bold">SSO</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </main>

                {/* FOOTER SIMPLE */}
                <footer className="py-6 text-center text-xs text-GrayBlue-400">
                    &copy; {new Date().getFullYear()} SpinTeam. Todos los derechos reservados.
                </footer>
            </div>
        </div>
    );
}