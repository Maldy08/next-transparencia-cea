import { IoWarningOutline } from "react-icons/io5";

interface Props {
     idbitacora: number;
     onDelete: (idbitacora: number) => Promise<void>
     onCancel: () => void
     handleReloadTable: () => void
     visible: boolean;

}

export const ModalEliminar = ({ visible, onCancel, onDelete, idbitacora, handleReloadTable }: Props) => {
    return (
        <div tabIndex={-1} aria-hidden="true" 
            className={`transition-all duration-200 ease-out
                ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`}
        >
            <div className="relative p-4 w-full max-w-sm">
                <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-elevated overflow-hidden">

                    {/* Close button */}
                    <button 
                        onClick={onCancel} 
                        type="button" 
                        className="absolute top-3 right-3 z-10 p-1.5 rounded-lg text-gray-400 dark:text-neutral-500
                            hover:bg-gray-100 dark:hover:bg-neutral-800 hover:text-gray-600 dark:hover:text-neutral-300
                            transition-colors duration-150"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>

                    {/* Content */}
                    <div className="px-6 pt-8 pb-6 text-center">
                        {/* Icon */}
                        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/30 
                            flex items-center justify-center border border-red-100 dark:border-red-900/30">
                            <IoWarningOutline className="w-7 h-7 text-red-500 dark:text-red-400" />
                        </div>

                        <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-1.5 font-display">
                            Eliminar registro
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-neutral-400">
                            ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 px-6 pb-6 pt-2">
                        <button
                            onClick={onCancel}
                            type="button"
                            className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-600 dark:text-neutral-400
                                bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200 dark:hover:bg-neutral-700
                                rounded-xl transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                        >
                            No, cancelar
                        </button>

                        <button
                            onClick={ async() => {
                                await onDelete(idbitacora);
                                onCancel();
                                handleReloadTable()
                            }}
                            type="button"
                            className="flex-1 py-2.5 px-4 text-sm font-semibold text-white
                                bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600
                                rounded-xl shadow-md hover:shadow-lg
                                transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
                        >
                            Sí, eliminar
                        </button>
                    </div>

                </div>
            </div>

            {/* Backdrop */}
            <div className="fixed inset-0 -z-10 bg-black/40 backdrop-blur-sm" onClick={onCancel}></div>
        </div>
    )
}
