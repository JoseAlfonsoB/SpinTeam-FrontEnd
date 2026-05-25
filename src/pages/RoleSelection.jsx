import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, Users, ArrowRight } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';

export default function RoleSelection() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#f3f4f6] font-sans text-BlueDark-950 flex flex-col justify-between">

            {/* NAVBAR SUPERIOR */}
            <nav className="w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {/* Tu icono de marca unificado */}
                    <div className="bg-BlueDark-950 text-white p-2 rounded-xl flex items-center justify-center">
                        <Users size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">SpinTeam</span>
                </div>

                <div className="flex items-center gap-6 text-sm font-semibold text-gray-500">
                    <a href="#" className="hover:text-BlueDark-950 transition-colors">Ayuda</a>
                    <a href="#" className="hover:text-BlueDark-950 transition-colors">Contacto</a>
                </div>
            </nav>

            {/* CONTENEDOR CENTRAL */}
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-5xl mx-auto w-full">

                {/* Título e Instrucción Principal */}
                <div className="text-center space-y-3 mb-12 max-w-2xl">
                    <Title level={1} className="text-4xl md:text-5xl font-black text-BlueDark-950 tracking-tight leading-tight">
                        ¿Cómo deseas ingresar <br className="hidden sm:inline" /> hoy?
                    </Title>
                    <p className="text-sm md:text-base text-gray-500 font-medium">
                        Personaliza tu experiencia de gestión según tu perfil de usuario.
                    </p>
                </div>

                {/* REJILLA DE TARJETAS DE SELECCIÓN */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-2">

                    {/* OPCIÓN: SOY DOCENTE */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-gray-100/50 flex flex-col items-center text-center justify-between space-y-8 group hover:shadow-xl transition-shadow">
                        <div className="space-y-6 flex flex-col items-center">
                            {/* Contenedor de Icono Sólido */}
                            <div className="bg-BlueDark-950 text-white w-24 h-24 rounded-2xl flex items-center justify-center shadow-md">
                                <GraduationCap size={44} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                                <Title level={3} className="text-2xl font-black text-BlueDark-950">
                                    Soy Docente
                                </Title>
                                <p className="text-sm text-gray-500 font-medium max-w-[280px] leading-relaxed">
                                    Gestiona tus equipos, califica proyectos y organiza sesiones de mentoría de alto impacto.
                                </p>
                            </div>
                        </div>

                        <Button
                            variant="primary"
                            iconRight={ArrowRight}
                            onClick={() => navigate('/login-docente')}
                            className="w-full py-4 rounded-xl text-sm font-bold bg-BlueDark-950 hover:bg-BlueDark-950/90 text-white flex justify-center items-center gap-2 shadow-sm"
                        >
                            Entrar como Docente
                        </Button>
                    </div>

                    {/* OPCIÓN: SOY ALUMNO */}
                    <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-lg border border-gray-100/50 flex flex-col items-center text-center justify-between space-y-8 group hover:shadow-xl transition-shadow">
                        <div className="space-y-6 flex flex-col items-center">
                            {/* Contenedor de Icono Claro con Sombra */}
                            <div className="bg-white text-BlueDark-950 w-24 h-24 rounded-2xl flex items-center justify-center shadow-md border border-gray-100">
                                <Users size={44} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                                <Title level={3} className="text-2xl font-black text-BlueDark-950">
                                    Soy Alumno
                                </Title>
                                <p className="text-sm text-gray-500 font-medium max-w-[280px] leading-relaxed">
                                    Colabora con tus compañeros, entrega tus trabajos y haz seguimiento de tu progreso.
                                </p>
                            </div>
                        </div>

                        {/* Variante de botón secundario según el diseño autorizado */}
                        <button
                            onClick={() => navigate('/generator')} // O la ruta que definas para la sala de espera FIFO del alumno
                            className="w-full py-4 rounded-xl text-sm font-bold bg-white border border-gray-200 text-BlueDark-950 hover:bg-gray-50 transition-colors flex justify-center items-center gap-2 shadow-sm"
                        >
                            <span>Entrar como Alumno</span>
                            <ArrowRight size={16} />
                        </button>
                    </div>

                </div>
            </main>

            {/* FOOTER SIMPLE */}
            <footer className="py-6 text-center text-xs text-gray-400 font-medium">
                ¿No tienes una cuenta?{' '}
                <a href="#" className="font-bold text-BlueDark-950 hover:underline">
                    Regístrate aquí
                </a>
            </footer>
        </div>
    );
}