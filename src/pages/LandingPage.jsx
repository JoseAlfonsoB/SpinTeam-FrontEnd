import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Users, Layout, Activity, ChevronRight } from 'lucide-react';
import Title from '../components/atoms/Title';
import Button from '../components/atoms/Button';
import Badge from '../components/atoms/Badge';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-Neutral-50 font-sans text-BlueDark-950">
            {/* NAVBAR */}
            <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-2">
                    <div className="bg-BlueDark-950 p-1.5 rounded-lg">
                        <Users className="text-white" size={24} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">SpinTeam.</span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-GrayBlue-500">
                    <a href="#" className="hover:text-BlueDark-950 transition-colors">Funcionalidades</a>
                    <a href="#" className="hover:text-BlueDark-950 transition-colors">Nosotros</a>
                    <a href="#" className="hover:text-BlueDark-950 transition-colors">Precios</a>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm font-bold uppercase tracking-widest text-BlueDark-950 hover:opacity-70 transition-opacity"
                    >
                        Ingresar
                    </button>
                    <Button variant="primary" className="rounded-full px-6 py-2 text-xs uppercase tracking-widest">
                        Empezar gratis
                    </Button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <main className="max-w-5xl mx-auto px-6 pt-16 md:pt-24 pb-12 text-center">
                <div className="flex justify-center mb-6">
                    <Badge variant="default" icon={Activity} className="bg-white border-GrayBlue-200 text-GrayBlue-500 py-1 px-4 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                        Nueva Versión 2.0
                    </Badge>
                </div>

                <Title level={1} className="text-5xl md:text-7xl font-black leading-[1.1] mb-6 tracking-tight">
                    Bienvenido a tu <br />
                    <span className="bg-gradient-to-r from-BlueDark-950 to-BlueDark-700 bg-clip-text text-transparent">
                        Gestión de Equipos
                    </span>
                </Title>

                <p className="text-lg md:text-xl text-GrayBlue-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                    Crea salas y organiza equipos automáticamente en tiempo real.
                    La herramienta definitiva para la coordinación de alto rendimiento.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                    <Button
                        variant="primary"
                        iconRight={ArrowRight}
                        onClick={() => navigate('/login')}
                        className="w-full sm:w-auto py-4 px-8 text-lg"
                    >
                        Comenzar Ahora
                    </Button>
                    <Button
                        variant="secondary"
                        icon={Play}
                        className="w-full sm:w-auto py-4 px-8 text-lg bg-white border-GrayBlue-200 rounded-full shadow-sm"
                    >
                        Ver Demo
                    </Button>
                </div>

                {/* DASHBOARD SNIPPET / PREVIEW */}
                <div className="relative max-w-4xl mx-auto">
                    <div className="bg-white border border-GrayBlue-200 rounded-2xl shadow-2xl overflow-hidden">
                        <div className="bg-Neutral-50 border-b border-GrayBlue-200 p-4 flex items-center gap-2">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                            </div>
                            <div className="mx-auto text-[10px] font-bold text-GrayBlue-400 uppercase tracking-widest">
                                Dashboard Overview
                            </div>
                        </div>

                        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-left p-6 bg-Neutral-50 rounded-xl border border-GrayBlue-100">
                                <span className="text-[10px] font-bold text-GrayBlue-400 uppercase tracking-widest">Equipos</span>
                                <div className="text-4xl font-black mt-1">124</div>
                            </div>
                            <div className="text-left p-6 bg-Neutral-50 rounded-xl border border-GrayBlue-100">
                                <span className="text-[10px] font-bold text-GrayBlue-400 uppercase tracking-widest">Salas</span>
                                <div className="text-4xl font-black mt-1">48</div>
                            </div>
                            <div className="text-left p-6 bg-Neutral-50 rounded-xl border border-GrayBlue-100">
                                <span className="text-[10px] font-bold text-GrayBlue-400 uppercase tracking-widest">Status</span>
                                <div className="flex items-center gap-2 mt-1">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                                    <span className="text-2xl font-black uppercase">En Vivo</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-BlueDark-700/10 rounded-full blur-2xl"></div>
                    <div className="absolute -top-6 -left-6 w-32 h-32 bg-Neutral-200/50 rounded-full blur-3xl"></div>
                </div>
            </main>

            {/* FOOTER SIMPLE */}
            <footer className="py-12 border-t border-GrayBlue-200 text-center">
                <p className="text-xs text-GrayBlue-400 font-bold uppercase tracking-[0.3em]">
                    Optimiza la coordinación de tu clase hoy mismo.
                </p>
            </footer>
        </div>
    );
}
