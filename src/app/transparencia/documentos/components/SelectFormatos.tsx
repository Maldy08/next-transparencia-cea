'use client'
import { Reporte } from "@/interfaces/Formato"
import { ChangeEvent } from "react";

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
        <div className="flex items-center gap-2">

            <label
                htmlFor="countries"
                className="block mb-2 text-md font-medium text-gray-900
                 dark:text-white"
            >
                Formato
            </label>
            <select
                onChange={handleChange}
                id="countries"
                value={value}
                className="  bg-gray-50 border border-gray-300 text-gray-900
                 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 
                 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                  dark:focus:border-blue-500"
            >
                <option disabled>Seleccione un formato</option>
                {
                    reporte.map((r) => (
                        <option value={r.nombre} key={r.codigo}>{r.nombre}</option>
                    ))
                }

            </select>
        </div>
    )
}
