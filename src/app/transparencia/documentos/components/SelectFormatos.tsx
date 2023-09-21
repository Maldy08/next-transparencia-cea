'use client'
import { Reporte } from "@/interfaces/Formato"
import { ChangeEvent, useEffect, useState } from "react";

interface Props {
    reporte: Reporte[];
}


export const SelectFormatos = ({ reporte }: Props) => {
    const [selected, setSelected] = useState("");

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value)
    }

    useEffect(() => {
        console.log(selected)
    }, [selected])


    return (
        <div>

            <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Formato</label>
            <select onChange={handleChange} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected disabled>Seleccione un formato</option>
                {
                    reporte.map((r) => (
                        <option value={r.nombre} key={r.codigo}>{r.nombre}</option>
                    ))
                }

            </select>
        </div>
    )
}
