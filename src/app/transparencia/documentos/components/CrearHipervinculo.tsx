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
            <form onSubmit={onFormSubmit} className="flex flex-col gap-4">

                {/* Periodo y Trimestre */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="periodo"
                            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
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
                            className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg
                                px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-300
                                focus:border-primary-500 transition-all duration-200 hover:border-gray-300"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label
                            htmlFor="trimestre"
                            className="text-xs font-semibold text-gray-600 uppercase tracking-wider"
                        >
                            Trimestre
                        </label>
                        <select
                            onChange={handleChangeTrimestre}
                            value={trimestre}
                            id="trimestre"
                            className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg
                                px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary-300
                                focus:border-primary-500 transition-all duration-200 hover:border-gray-300"
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
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5 block">
                        Archivos
                    </label>
                    <section
                        onClick={() => { inputArchivo.current?.click() }}
                        className={`cursor-pointer flex flex-col items-center justify-center gap-2
                            min-h-[160px] rounded-xl border-2 border-dashed transition-all duration-300
                            ${archivo
                                ? 'border-primary-400 bg-primary-50/50'
                                : 'border-gray-300 bg-gray-50 hover:border-primary-300 hover:bg-primary-50/30'
                            }`}
                    >
                        {
                            archivo === null
                                ? (
                                    <>
                                        <div className="p-3 bg-primary-100 rounded-full">
                                            <IoCloudUploadOutline className="w-8 h-8 text-primary-700" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-gray-700">
                                                Haz clic para seleccionar archivos
                                            </p>
                                            <p className="text-[11px] text-gray-400 mt-0.5">
                                                PDF, DOC, XLS — máx. 8 MB por archivo
                                            </p>
                                        </div>
                                    </>
                                )
                                : (
                                    <div className="w-full px-4 py-3 max-h-44 overflow-auto">
                                        <div className="flex items-center gap-1.5 mb-2">
                                            <IoCheckmarkCircleOutline className="w-4 h-4 text-green-600 flex-shrink-0" />
                                            <span className="text-xs font-semibold text-gray-600">
                                                {archivo.length} archivo{archivo.length > 1 ? 's' : ''} seleccionado{archivo.length > 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        {archivo.map((a) => {
                                            const regex = new RegExp("[^.]+$");
                                            const extension = a.name.match(regex);
                                            return (
                                                <div key={a.name} className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-primary-50 transition-colors">
                                                    <Image
                                                        src={`/assets/${extension![0].toString()}.png`}
                                                        alt="icono"
                                                        width={20}
                                                        height={20}
                                                        className="flex-shrink-0"
                                                    />
                                                    <span className="text-xs text-gray-700 truncate">{a.name}</span>
                                                    <span className="ml-auto text-[10px] text-gray-400 flex-shrink-0">
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
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-medium text-gray-600">
                                Subiendo archivo{archivo && archivo.length > 1 ? 's' : ''}...
                            </span>
                            <span className="text-xs font-bold text-primary-800">
                                {progress}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="h-2.5 rounded-full transition-all duration-300 ease-in-out"
                                style={{
                                    width: `${progress}%`,
                                    background: 'linear-gradient(90deg, #951f43, #b42251)',
                                }}
                            />
                        </div>
                    </div>
                }

                {/* Botón y notas */}
                <div className="flex flex-col gap-2">
                    <button
                        disabled={submit}
                        type="submit"
                        className="w-full flex items-center justify-center gap-2 text-white font-semibold
                            rounded-lg px-5 py-2.5 text-sm shadow-md
                            transition-all duration-200 hover:shadow-lg hover:scale-[1.01] active:scale-[0.99]
                            disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
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
                        <p className="text-[11px] text-gray-400"><i>* Máx. 50 caracteres por nombre</i></p>
                        <p className="text-[11px] text-gray-400"><i>* Tamaño máximo: 8 MB</i></p>
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
