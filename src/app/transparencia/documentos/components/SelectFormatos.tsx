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
        <div className="flex flex-col gap-1.5">
            <label
                htmlFor="formato-select"
                className="text-xs font-600 text-gray-600 uppercase tracking-wider"
            >
                Formato
            </label>

            <div className="relative">
                <select
                    onChange={handleChange}
                    id="formato-select"
                    value={value}
                    className="appearance-none w-full bg-gray-50 border border-gray-200 text-gray-800
                        text-sm rounded-lg px-3 py-2.5 pr-9
                        focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-500
                        transition-all duration-200 cursor-pointer hover:border-gray-300"
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
                    <IoChevronDownOutline className="w-4 h-4 text-gray-400" />
                </div>
            </div>
        </div>
    )
}
