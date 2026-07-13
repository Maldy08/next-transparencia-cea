'use client'

import Image from "next/image";
import { IoCloudUploadOutline, IoDocumentOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import { useCrearHipervinculo } from "../hooks/useCrearHipervinculo";
import { LoadingButton, ModalEliminar, ModalModificaArchivos, ModalNuevosArchivos } from ".";
import { Bitacoras } from "@/interfaces";

interface Props {
    formato: string;
    idusuario: number;
    modalDelete: boolean;
    idbitacora: number;
    onCancel: () => void;
    handleReloadTable: () => void;
    file_size_limit: number;
}

export const CrearHipervinculo = ({
    formato,
    idusuario,
    modalDelete,
    idbitacora,
    onCancel,
    handleReloadTable,
    file_size_limit }: Props) => {

    const setBitacorasResponse = (data: Bitacoras[]) => setBitacoras(data);

    const {
        inputArchivo,
        archivo,
        handleChangeFile,
        handleChangePeriodo,
        periodo,
        trimestre,
        handleChangeTrimestre,
        onFormSubmit,
        modal,
        setModal,
        modalModificar,
        setModalModificar,
        bitacoras,
        setBitacoras,
        submit,
        handleDeleteBitacora,
        progress,

    } = useCrearHipervinculo({
        formato,
        idusuario,
        setBitacorasResponse,
        idbitacora,
        file_size_limit,

    });


    return (
        <div className="mt-5">
            <form onSubmit={onFormSubmit} className="flex flex-col gap-5">

                {/* Periodo y Trimestre */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="periodo"
                            className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-[0.12em]"
                        >
                            Periodo
                        </label>
                        <input
                            onChange={handleChangePeriodo}
                            type="number"
                            id="periodo"
                            min={2023}
                            max={2030}
                            value={periodo}
                            className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 
                                text-gray-800 dark:text-neutral-200 text-sm rounded-xl
                                px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300/50 
                                focus:border-primary-400 dark:focus:ring-primary-800/50 dark:focus:border-primary-700
                                transition-all duration-200 hover:border-gray-300 dark:hover:border-neutral-600
                                shadow-inner-subtle"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label
                            htmlFor="trimestre"
                            className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-[0.12em]"
                        >
                            Trimestre
                        </label>
                        <select
                            onChange={handleChangeTrimestre}
                            value={trimestre}
                            id="trimestre"
                            className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 
                                text-gray-800 dark:text-neutral-200 text-sm rounded-xl
                                px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-300/50 
                                focus:border-primary-400 dark:focus:ring-primary-800/50 dark:focus:border-primary-700
                                transition-all duration-200 hover:border-gray-300 dark:hover:border-neutral-600
                                shadow-inner-subtle"
                        >
                            <option disabled>Seleccione un trimestre</option>
                            <option value={1}>1er trimestre</option>
                            <option value={2}>2do trimestre</option>
                            <option value={3}>3er trimestre</option>
                            <option value={4}>4to trimestre</option>
                        </select>
                    </div>
                </div>

                {/* Zona de drop archivos */}
                <div>
                    <label className="text-[11px] font-semibold text-gray-500 dark:text-neutral-400 uppercase tracking-[0.12em] mb-2 block">
                        Archivos
                    </label>
                    <section
                        onClick={() => { inputArchivo.current?.click() }}
                        className={`cursor-pointer flex flex-col items-center justify-center gap-3
                            min-h-[170px] rounded-xl border-2 border-dashed transition-all duration-300
                            ${archivo
                                ? 'border-primary-300 dark:border-primary-700 bg-primary-50/40 dark:bg-primary-950/20'
                                : 'border-gray-300 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-800/50 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-primary-50/30 dark:hover:bg-primary-950/10'
                            }`}
                    >
                        {
                            archivo === null
                                ? (
                                    <>
                                        <div className="p-4 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/50 dark:to-primary-950/50 rounded-2xl shadow-sm">
                                            <IoCloudUploadOutline className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-gray-600 dark:text-neutral-300">
                                                Haz clic para seleccionar archivos
                                            </p>
                                            <p className="text-[11px] text-gray-400 dark:text-neutral-500 mt-1">
                                                PDF, DOC, XLS — máx. 8 MB por archivo
                                            </p>
                                        </div>
                                    </>
                                )
                                : (
                                    <div className="w-full px-4 py-3 max-h-44 overflow-auto">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="p-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                                                <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                                            </div>
                                            <span className="text-xs font-semibold text-gray-600 dark:text-neutral-300">
                                                {archivo.length} archivo{archivo.length > 1 ? 's' : ''} seleccionado{archivo.length > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        {archivo.map((a) => {
                                            const regex = new RegExp("[^.]+$");
                                            const extension = a.name.match(regex);
                                            return (
                                                <div key={a.name} className="flex items-center gap-3 py-2 px-3 rounded-xl 
                                                    hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors group">
                                                    <Image
                                                        src={`/assets/${extension![0].toString()}.png`}
                                                        alt="icono"
                                                        width={22}
                                                        height={22}
                                                        className="flex-shrink-0"
                                                    />
                                                    <span className="text-xs text-gray-700 dark:text-neutral-300 truncate">{a.name}</span>
                                                    <span className="ml-auto text-[10px] text-gray-400 dark:text-neutral-500 flex-shrink-0 
                                                        bg-gray-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full font-medium">
                                                        {(a.size / 1024 / 1024).toFixed(2)} MB
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )
                        }

                        <label htmlFor="archivos" className="hidden">archivo</label>
                        <input
                            onChange={handleChangeFile}
                            ref={inputArchivo}
                            type="file"
                            name="archivos"
                            id="archivos"
                            multiple={true}
                            accept=".doc,.docx,.xls,.xlsx,.pdf"
                            className="hidden"
                        />
                    </section>
                </div>

                {/* Barra de progreso */}
                {
                    progress > 0 &&
                    <div className="animate-fade-in-scale">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-xs font-medium text-gray-600 dark:text-neutral-400">
                                Subiendo archivo{archivo && archivo.length > 1 ? 's' : ''}...
                            </span>
                            <span className="text-xs font-bold text-primary-700 dark:text-primary-400 tabular-nums">
                                {progress}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden shadow-inner">
                            <div
                                className="h-2.5 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #951f43, #b42251, #d03268)',
                                }}
                            >
                                {/* Shimmer overlay */}
                                <div className="absolute inset-0 shimmer" />
                            </div>
                        </div>
                    </div>
                }

                {/* Botón y notas */}
                <div className="flex flex-col gap-3">
                    <button
                        disabled={submit}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 text-white font-semibold
                            rounded-xl px-5 py-3 text-sm
                            shadow-md hover:shadow-glow
                            transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                            disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-md"
                        style={{
                            background: submit
                                ? '#951f43'
                                : 'linear-gradient(135deg, #951f43 0%, #651930 100%)',
                        }}
                    >
                        {submit
                            ? <LoadingButton />
                            : (
                                <>
                                    <IoCloudUploadOutline className="w-4 h-4" />
                                    Cargar documentos
                                </>
                            )
                        }
                    </button>
                    <div className="flex gap-4">
                        <p className="text-[10px] text-gray-400 dark:text-neutral-600 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600" />
                            Máx. 50 caracteres por nombre
                        </p>
                        <p className="text-[10px] text-gray-400 dark:text-neutral-600 flex items-center gap-1">
                            <span className="inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-neutral-600" />
                            Tamaño máximo: 8 MB
                        </p>
                    </div>
                </div>

                {
                    modal && bitacoras.length > 0 &&
                    <ModalNuevosArchivos
                        data={bitacoras}
                        isOpen={modal}
                        onShowModalClick={() => setModal((prev) => !prev)}
                        handleReloadTable={handleReloadTable}
                    />
                }

                {
                    modalDelete &&
                    <ModalEliminar
                        visible={modalDelete}
                        onCancel={onCancel}
                        idbitacora={idbitacora}
                        onDelete={handleDeleteBitacora}
                        handleReloadTable={handleReloadTable}
                    />
                }
            </form>
        </div>
    )
}
