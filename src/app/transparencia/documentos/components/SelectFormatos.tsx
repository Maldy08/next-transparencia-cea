'use client'
import { Reporte } from "@/interfaces/Formato"
import { ChangeEvent } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

interface Props {
    reporte: Reporte[];
    handleChangeFormato(e: ChangeEvent<HTMLSelectElement>): void
    value: string;
}


export const SelectFormatos = ({ value, reporte, handleChangeFormato }: Props) => {

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        handleChangeFormato(e)
    }

    return (
        <div className="flex flex-col gap-2">
            <label
                htmlFor="formato-select"
                className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-[0.12em]"
            >
                Formato
            </label>

            <div className="relative group">
                <select
                    onChange={handleChange}
                    id="formato-select"
                    value={value}
                    className="appearance-none w-full bg-gray-50 dark:bg-neutral-800 
                        border border-gray-200 dark:border-neutral-700 
                        text-gray-800 dark:text-neutral-200
                        text-sm rounded-xl px-4 py-3 pr-10
                        focus:outline-none focus:ring-2 focus:ring-primary-300/50 focus:border-primary-400
                        dark:focus:ring-primary-800/50 dark:focus:border-primary-700
                        transition-all duration-200 cursor-pointer 
                        hover:border-gray-300 dark:hover:border-neutral-600
                        shadow-inner-subtle"
                >
                    <option disabled value="Seleccione un formato">Seleccione un formato</option>
                    {
                        reporte.map((r) => (
                            <option value={r.nombre} key={r.codigo}>{r.nombre}</option>
                        ))
                    }
                </select>
                {/* Flecha personalizada */}
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <IoChevronDownOutline className="w-4 h-4 text-gray-400 dark:text-neutral-500 transition-transform duration-200 group-focus-within:rotate-180" />
                </div>
            </div>
        </div>
    )
}
