'use client';

import { ChevronDownIcon, UserCircleIcon } from "@heroicons/react/20/solid"
import { signOut } from "next-auth/react";
import { useState } from "react";

interface ButtonHeaderProps {
    user: string
}

export const ButtonHeader = ({ user }: ButtonHeaderProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <button
                type="button"
                className='inline-flex items-center gap-2 rounded-lg bg-white/10 hover:bg-white/20
                    px-3 py-1.5 text-xs text-white font-medium shadow-sm
                    ring-1 ring-white/20 transition-all duration-200'
                onClick={() => setOpen(!open)}
            >
                <UserCircleIcon className="h-5 w-5 text-white/70" />
                <span className='uppercase tracking-wide'>{user}</span>
                <ChevronDownIcon
                    className={`h-4 w-4 text-white/60 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 mt-2 w-48 overflow-hidden rounded-lg bg-white shadow-xl
                    ring-1 ring-black/5 transition-all duration-200 origin-top-right z-50
                    ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'}`}
            >
                <div className="py-1">
                    <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Sesión activa</p>
                        <p className="text-xs font-semibold text-gray-700 truncate">{user}</p>
                    </div>
                    <a
                        href="#"
                        onClick={async () => { setOpen(false); await signOut(); }}
                        className="flex items-center gap-2 px-4 py-2.5 text-xs text-gray-600
                            hover:bg-primary-50 hover:text-primary-800 transition-colors duration-150"
                    >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                        </svg>
                        Cerrar sesión
                    </a>
                </div>
            </div>
        </div>
    )
}