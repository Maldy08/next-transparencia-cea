'use client'

import { Reporte } from "@/interfaces/Formato";
import { CrearHipervinculo, SelectFormatos, TableBitacoras } from "."
import { useWrapper } from "../hooks/useWrapper";
import { IoDocumentsOutline, IoCloudUploadOutline } from "react-icons/io5";


interface WrapperProps {
    reporte: Reporte[];
    idusuario: number;
    file_size_limit: number;
}

export const Wrapper = ({ reporte, idusuario, file_size_limit }: WrapperProps) => {

    const {
        formato,
        handleChangeFormato,
        deleteDataHandler,
        modalDelete,
        idbitacora,
        handleCancelDelete,
        reloadTable,
        handleReloadTable,
    } = useWrapper();


    return (
        <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* Panel izquierdo — Formulario */}
            <div className="w-full lg:w-5/12 xl:w-2/5 flex-shrink-0">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                    {/* Encabezado del panel */}
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3"
                        style={{ background: 'linear-gradient(90deg, #651930 0%, #7a1e39 100%)' }}
                    >
                        <div className="p-2 bg-white/10 rounded-lg">
                            <IoCloudUploadOutline className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-white font-semibold text-sm">Carga de Documentos</h2>
                            <p className="text-white/60 text-[11px]">Selecciona el formato y sube tus archivos</p>
                        </div>
                    </div>

                    {/* Contenido del formulario */}
                    <div className="p-6">
                        <SelectFormatos
                            value={formato}
                            reporte={reporte}
                            handleChangeFormato={handleChangeFormato}
                        />

                        {/* Formulario */}
                        <CrearHipervinculo
                            formato={formato}
                            idusuario={idusuario}
                            modalDelete={modalDelete}
                            idbitacora={idbitacora}
                            onCancel={handleCancelDelete}
                            handleReloadTable={handleReloadTable}
                            file_size_limit={file_size_limit}
                        />
                    </div>
                </div>
            </div>

            {/* Panel derecho — Tabla */}
            <div className="w-full lg:flex-1 min-w-0">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                    {/* Encabezado de la tabla */}
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3"
                        style={{ background: 'linear-gradient(90deg, #651930 0%, #7a1e39 100%)' }}
                    >
                        <div className="p-2 bg-white/10 rounded-lg">
                            <IoDocumentsOutline className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-white font-semibold text-sm">Historial de Documentos</h2>
                            <p className="text-white/60 text-[11px]">
                                {formato && formato !== 'Seleccione un formato'
                                    ? `Formato: ${formato}`
                                    : 'Selecciona un formato para ver el historial'}
                            </p>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="p-4">
                        <TableBitacoras
                            idusuario={idusuario}
                            formato={formato}
                            onDeleteData={deleteDataHandler}
                            reload={reloadTable}
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
