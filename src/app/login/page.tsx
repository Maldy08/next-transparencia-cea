import Image from "next/image"
import { FormLogin } from "./FormLogin";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export const metadata = {
    title: 'CEABC — Iniciar Sesión',
    description: 'Acceso al Repositorio de Documentos de Transparencia — Comisión Estatal del Agua de Baja California',
};


export default async function LoginPage() {

    const session = await getServerSession(authOptions);
    if (session) {
        redirect('/transparencia/documentos')
    }

    const sistema = process.env.NOMBRE_SISTEMA;

    return (
        <main className="min-h-screen flex">

            {/* Panel izquierdo — Identidad visual */}
            <div
                className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col items-center justify-center relative overflow-hidden"
                style={{
                    background: 'linear-gradient(145deg, #3d0a18 0%, #4b0c1f 20%, #651930 45%, #7a1e39 70%, #8a2242 85%, #951f43 100%)',
                }}
            >
                {/* Patrón decorativo de fondo */}
                <div className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 1.5px, transparent 1.5px),
                                          radial-gradient(circle at 75% 75%, white 1.5px, transparent 1.5px)`,
                        backgroundSize: '50px 50px',
                    }}
                />

                {/* Círculos decorativos flotantes */}
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-[0.06] border-2 border-white animate-float" 
                    style={{ animationDelay: '0s' }}
                />
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.06] border-2 border-white animate-float" 
                    style={{ animationDelay: '3s' }}
                />
                <div className="absolute top-1/2 -left-16 w-48 h-48 rounded-full opacity-[0.04] border border-white animate-float" 
                    style={{ animationDelay: '1.5s' }}
                />

                {/* Glow ambiental */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(189,140,82,0.15), transparent 70%)' }}
                />

                {/* Contenido central */}
                <div className="relative z-10 flex flex-col items-center gap-8 px-12 text-center">
                    <Image
                        src="/assets/logo-blanco.png"
                        alt="Logo CEABC"
                        width={320}
                        height={130}
                        className="drop-shadow-2xl"
                        priority
                    />
                    
                    {/* Separador dorado */}
                    <div className="w-20 h-[2px] rounded-full"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(189,140,82,0.7), rgba(212,167,106,0.9), rgba(189,140,82,0.7), transparent)' }}
                    />

                    <div>
                        <h1 className="text-white text-2xl font-bold tracking-wide uppercase leading-snug font-display">
                            {sistema}
                        </h1>
                        <p className="text-white/40 text-sm mt-3 leading-relaxed max-w-xs">
                            Comisión Estatal del Agua de Baja California
                        </p>
                    </div>

                    {/* Tarjetas de características */}
                    <div className="flex flex-col gap-3 mt-4 w-full max-w-sm">
                        {[
                            { icon: '🔒', text: 'Acceso seguro con credenciales institucionales' },
                            { icon: '📁', text: 'Gestión centralizada de documentos oficiales' },
                            { icon: '🔗', text: 'Generación automática de hipervínculos' },
                        ].map((item, i) => (
                            <div 
                                key={item.text} 
                                className="flex items-start gap-3 bg-white/[0.06] rounded-xl px-5 py-3.5 text-left 
                                    backdrop-blur-sm border border-white/[0.06]
                                    hover:bg-white/[0.1] hover:border-white/[0.12] transition-all duration-300"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            >
                                <span className="text-lg flex-shrink-0 mt-0.5">{item.icon}</span>
                                <p className="text-white/70 text-xs leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Panel derecho — Formulario */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col items-center justify-center px-6 py-12 
                bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950
                relative overflow-hidden"
            >
                {/* Patrón decorativo sutil */}
                <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `radial-gradient(circle, #651930 1px, transparent 1px)`,
                        backgroundSize: '30px 30px',
                    }}
                />

                {/* Logo visible solo en móvil */}
                <div className="lg:hidden mb-8 relative z-10">
                    <Image
                        src="/assets/logo.png"
                        alt="Logo CEABC"
                        width={280}
                        height={110}
                        priority
                    />
                </div>

                <div className="w-full max-w-sm relative z-10">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-neutral-100 font-display">Bienvenido</h2>
                        <p className="text-sm text-gray-400 dark:text-neutral-500 mt-1.5">Ingresa tus credenciales para continuar</p>
                    </div>

                    <FormLogin titulo={sistema!} />

                    <p className="mt-8 text-center text-[11px] text-gray-300 dark:text-neutral-600">
                        Sistema de Transparencia © 2024 — CEABC
                    </p>
                </div>
            </div>

        </main>
    );
}