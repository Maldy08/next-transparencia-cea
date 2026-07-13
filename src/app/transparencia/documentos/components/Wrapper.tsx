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
        <div className="flex flex-col lg:flex-row gap-6 items-start w-full">

            {/* Panel izquierdo — Formulario */}
            <div className="w-full lg:w-5/12 xl:w-2/5 flex-shrink-0">
                <div className="premium-card rounded-2xl overflow-hidden">

                    {/* Encabezado del panel */}
                    <div className="relative px-6 py-4 flex items-center gap-3 overflow-hidden"
                        style={{ background: 'var(--header-gradient)' }}
                    >
                        {/* Decoración de fondo */}
                        <div className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                            }}
                        />
                        <div className="relative p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/[0.08]">
                            <IoCloudUploadOutline className="w-5 h-5 text-white" />
                        </div>
                        <div className="relative">
                            <h2 className="text-white font-semibold text-sm font-display tracking-wide">Carga de Documentos</h2>
                            <p className="text-white/50 text-[11px]">Selecciona el formato y sube tus archivos</p>
                        </div>
                    </div>

                    {/* Contenido del formulario */}
                    <div className="p-6 bg-white dark:bg-neutral-900">
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
                <div className="premium-card rounded-2xl overflow-hidden">

                    {/* Encabezado de la tabla */}
                    <div className="relative px-6 py-4 flex items-center gap-3 overflow-hidden"
                        style={{ background: 'var(--header-gradient)' }}
                    >
                        {/* Decoración de fondo */}
                        <div className="absolute inset-0 opacity-[0.04]"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '24px 24px',
                            }}
                        />
                        <div className="relative p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/[0.08]">
                            <IoDocumentsOutline className="w-5 h-5 text-white" />
                        </div>
                        <div className="relative">
                            <h2 className="text-white font-semibold text-sm font-display tracking-wide">Historial de Documentos</h2>
                            <p className="text-white/50 text-[11px]">
                                {formato && formato !== 'Seleccione un formato'
                                    ? `Formato: ${formato}`
                                    : 'Selecciona un formato para ver el historial'}
                            </p>
                        </div>
                    </div>

                    {/* Tabla */}
                    <div className="bg-white dark:bg-neutral-900">
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
