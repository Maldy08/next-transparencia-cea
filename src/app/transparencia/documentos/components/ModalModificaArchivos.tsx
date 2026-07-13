import { IoCheckmarkCircleOutline } from "react-icons/io5";

interface Props { 
    onShowModalClick(): void
    isOpen:boolean;
    handleReloadTable: () => void;
}


export const  ModalModificaArchivos = ({  onShowModalClick , isOpen, handleReloadTable}: Props) => { 
    return (
        <div>
            <div tabIndex={-1}   
                className={ !isOpen 
                    ? "animate-openmodal w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    : "animate-closemodal w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                }>
                <div className="relative flex max-h-full w-full max-w-md mx-4">
                    <div className="border-0 rounded-2xl shadow-elevated relative flex flex-col w-full bg-white dark:bg-neutral-900 outline-none focus:outline-none overflow-hidden">

                        {/* Header */}
                        <div className="relative flex items-center gap-3 px-6 py-5 overflow-hidden"
                            style={{ background: 'var(--header-gradient)' }}
                        >
                            <div className="absolute inset-0 opacity-[0.04]"
                                style={{
                                    backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                    backgroundSize: '20px 20px',
                                }}
                            />
                            <div className="relative p-2 bg-white/10 rounded-xl">
                                <IoCheckmarkCircleOutline className="w-5 h-5 text-emerald-300" />
                            </div>
                            <h3 className="relative text-base font-semibold text-white font-display tracking-wide">
                                Archivos reemplazados
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="px-6 py-8 text-center">
                            <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30
                                flex items-center justify-center border border-emerald-100 dark:border-emerald-900/30">
                                <IoCheckmarkCircleOutline className="w-7 h-7 text-emerald-500 dark:text-emerald-400" />
                            </div>
                            <p className="text-sm text-gray-600 dark:text-neutral-300 font-medium">
                                Se han reemplazado los archivos exitosamente
                            </p>
                            <p className="text-xs text-gray-400 dark:text-neutral-500 mt-1">
                                Los documentos han sido actualizados en el servidor
                            </p>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end px-6 py-4 border-t border-gray-100 dark:border-neutral-800">
                            <button 
                                type="button" 
                                onClick={ () => {
                                    onShowModalClick()
                                    handleReloadTable()
                                }}
                                className="px-6 py-2.5 text-sm font-semibold text-white rounded-xl shadow-md
                                    hover:shadow-glow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                                style={{ background: 'linear-gradient(135deg, #951f43 0%, #651930 100%)' }}
                            >
                                Continuar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"></div>
        </div>

    )
}