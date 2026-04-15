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
                    background: 'linear-gradient(145deg, #4b0c1f 0%, #651930 35%, #7a1e39 65%, #951f43 100%)',
                }}
            >
                {/* Patrón decorativo de fondo */}
                <div className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                                          radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
                {/* Círculo decorativo grande */}
                <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full opacity-10 border-4 border-white" />
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 border-4 border-white" />

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
                    <div className="w-16 h-1 rounded-full bg-secondary-400 opacity-70" />
                    <div>
                        <h1 className="text-white text-2xl font-bold tracking-wide uppercase leading-snug">
                            {sistema}
                        </h1>
                        <p className="text-white/50 text-sm mt-3 leading-relaxed max-w-xs">
                            Comisión Estatal del Agua de Baja California
                        </p>
                    </div>

                    {/* Tarjetas de características */}
                    <div className="flex flex-col gap-3 mt-4 w-full max-w-sm">
                        {[
                            { icon: '🔒', text: 'Acceso seguro con credenciales institucionales' },
                            { icon: '📁', text: 'Gestión centralizada de documentos oficiales' },
                            { icon: '🔗', text: 'Generación automática de hipervínculos' },
                        ].map((item) => (
                            <div key={item.text} className="flex items-start gap-3 bg-white/10 rounded-xl px-4 py-3 text-left backdrop-blur-sm">
                                <span className="text-lg flex-shrink-0">{item.icon}</span>
                                <p className="text-white/80 text-xs leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Panel derecho — Formulario */}
            <div className="w-full lg:w-1/2 xl:w-2/5 flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-gray-50 to-gray-100">

                {/* Logo visible solo en móvil */}
                <div className="lg:hidden mb-8">
                    <Image
                        src="/assets/logo.png"
                        alt="Logo CEABC"
                        width={280}
                        height={110}
                        priority
                    />
                </div>

                <div className="w-full max-w-sm">
                    <div className="mb-8 text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
                        <p className="text-sm text-gray-500 mt-1">Ingresa tus credenciales para continuar</p>
                    </div>

                    <FormLogin titulo={sistema!} />

                    <p className="mt-8 text-center text-[11px] text-gray-400">
                        Sistema de Transparencia © 2024 — CEABC
                    </p>
                </div>
            </div>

        </main>
    );
}