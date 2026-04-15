'use client';

import { FormatoDto } from "@/interfaces/Formato"


interface TablaProps {
    data: FormatoDto[]
}

export const Tabla = ({ data }: TablaProps) => {

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Descripción</th>

                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.codigo}</td>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
