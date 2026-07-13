'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";

interface Props {
    titulo: string;
}

export const FormLogin = ({ titulo }: Props) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/transparencia/documentos";

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            setFormValues({ email: "", password: "" });

            const res = await signIn("credentials", {
                redirect: false,
                email: formValues.email,
                password: formValues.password,
                callbackUrl
            });

            setLoading(false);

            if (!res?.error) {
                router.push(callbackUrl);
            } else {
                setError("Usuario y/o contraseña incorrectos");
            }
        } catch (error: any) {
            setLoading(false);
            setError("Error al intentar iniciar sesión");
            console.log(error)
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">

            {/* Campo Usuario */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-[0.12em]">
                    Usuario
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400 dark:text-neutral-500 group-focus-within:text-primary-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <input
                        value={formValues.email}
                        onChange={handleChange}
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="username"
                        placeholder="Nombre de usuario"
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-neutral-800 
                            border border-gray-200 dark:border-neutral-700 rounded-xl 
                            text-sm text-gray-800 dark:text-neutral-200
                            placeholder-gray-300 dark:placeholder-neutral-600 
                            focus:outline-none focus:ring-2 focus:ring-primary-300/50 focus:border-primary-400
                            dark:focus:ring-primary-800/50 dark:focus:border-primary-700
                            transition-all duration-200 hover:border-gray-300 dark:hover:border-neutral-600
                            shadow-inner-subtle"
                    />
                </div>
            </div>

            {/* Campo Contraseña */}
            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-[0.12em]">
                    Contraseña
                </label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400 dark:text-neutral-500 group-focus-within:text-primary-500 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <input
                        value={formValues.password}
                        onChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        autoComplete="current-password"
                        placeholder="••••••••"
                        className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-neutral-800 
                            border border-gray-200 dark:border-neutral-700 rounded-xl 
                            text-sm text-gray-800 dark:text-neutral-200
                            placeholder-gray-300 dark:placeholder-neutral-600 
                            focus:outline-none focus:ring-2 focus:ring-primary-300/50 focus:border-primary-400
                            dark:focus:ring-primary-800/50 dark:focus:border-primary-700
                            transition-all duration-200 hover:border-gray-300 dark:hover:border-neutral-600
                            shadow-inner-subtle"
                    />
                    {/* Toggle mostrar contraseña */}
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3.5 flex items-center text-gray-400 dark:text-neutral-500
                            hover:text-gray-600 dark:hover:text-neutral-300 transition-colors duration-200"
                        tabIndex={-1}
                        aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                        {showPassword ? (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mensaje de error */}
            {error && (
                <div className="animate-fade-in-scale flex items-start gap-3 bg-red-50 dark:bg-red-950/30 
                    border border-red-200 dark:border-red-900/40 rounded-xl px-4 py-3">
                    <div className="p-1 bg-red-100 dark:bg-red-900/30 rounded-lg flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-red-500 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-400 font-medium flex-1">{error}</p>
                    <button
                        type="button"
                        onClick={() => setError("")}
                        className="text-red-300 dark:text-red-700 hover:text-red-500 dark:hover:text-red-400 transition-colors flex-shrink-0"
                        aria-label="Cerrar"
                    >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* Botón submit */}
            <button
                disabled={loading}
                type="submit"
                className="w-full flex items-center justify-center gap-2 text-white font-semibold
                    rounded-xl px-5 py-3 text-sm mt-1
                    shadow-md hover:shadow-glow
                    transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-md"
                style={{
                    background: loading
                        ? '#951f43'
                        : 'linear-gradient(135deg, #651930 0%, #951f43 100%)',
                }}
            >
                {loading ? (
                    <>
                        <svg className="w-4 h-4 animate-spin text-white/40" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                            <path className="opacity-90" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        <span>
                            Verificando
                            <span className="inline-flex w-5 justify-start">
                                <span className="animate-[dot-pulse_1.4s_ease-in-out_0s_infinite]">.</span>
                                <span className="animate-[dot-pulse_1.4s_ease-in-out_0.2s_infinite]">.</span>
                                <span className="animate-[dot-pulse_1.4s_ease-in-out_0.4s_infinite]">.</span>
                            </span>
                        </span>
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Iniciar Sesión
                    </>
                )}
            </button>

        </form>
    )
}
