'use client';

import { ChevronDownIcon } from "@heroicons/react/20/solid"
import { signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

interface ButtonHeaderProps {
    user: string
}

export const ButtonHeader = ({ user }: ButtonHeaderProps) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Generar iniciales del usuario
    const initials = user
        ?.split(' ')
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase() || '??';

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                className='inline-flex items-center gap-2.5 rounded-xl
                    px-3 py-1.5 text-xs text-white font-medium
                    bg-white/[0.08] hover:bg-white/[0.15]
                    backdrop-blur-sm border border-white/[0.1]
                    shadow-sm transition-all duration-200
                    hover:shadow-md hover:border-white/[0.2]'
                onClick={() => setOpen(!open)}
            >
                {/* Avatar con iniciales */}
                <div className="relative">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold tracking-wide"
                        style={{ background: 'linear-gradient(135deg, rgba(189,140,82,0.8), rgba(212,167,106,0.9))' }}
                    >
                        {initials}
                    </div>
                    {/* Punto de estado activo */}
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-primary-950 animate-pulse-glow" />
                </div>
                <span className='uppercase tracking-wide hidden sm:inline'>{user}</span>
                <ChevronDownIcon
                    className={`h-4 w-4 text-white/50 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 mt-2.5 w-56 overflow-hidden rounded-xl
                    bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl
                    shadow-elevated border border-black/[0.06] dark:border-white/[0.08]
                    transition-all duration-200 origin-top-right z-50
                    ${open
                        ? 'opacity-100 scale-100 translate-y-0'
                        : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
            >
                <div className="py-1">
                    {/* Info de sesión */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-neutral-700">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                            <p className="text-[10px] text-gray-400 dark:text-neutral-500 uppercase tracking-[0.15em] font-semibold">
                                Sesión activa
                            </p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700 dark:text-neutral-200 truncate">{user}</p>
                    </div>

                    {/* Cerrar sesión */}
                    <a
                        href="#"
                        onClick={async () => { setOpen(false); await signOut(); }}
                        className="flex items-center gap-3 px-4 py-3 text-xs text-gray-500 dark:text-neutral-400 font-medium
                            hover:bg-primary-50 dark:hover:bg-primary-950/30 hover:text-primary-800 dark:hover:text-primary-300
                            transition-all duration-150 group"
                    >
                        <div className="p-1.5 rounded-lg bg-gray-100 dark:bg-neutral-700 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/50 transition-colors">
                            <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                            </svg>
                        </div>
                        Cerrar sesión
                    </a>
                </div>
            </div>
        </div>
    )
}