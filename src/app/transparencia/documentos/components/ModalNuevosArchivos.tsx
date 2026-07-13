import { Bitacoras } from "@/interfaces"
import { IoCheckmarkCircleOutline, IoLinkOutline } from "react-icons/io5";

interface Props {
    data: Bitacoras[];
    onShowModalClick(): void
    isOpen:boolean;
    handleReloadTable: () => void;
}


export const ModalNuevosArchivos = ({ data, onShowModalClick , isOpen, handleReloadTable}: Props) => {
    return (
        <div>
            {/* Overlay con blur */}
            <div tabIndex={-1}   
                className={ !isOpen 
                    ? "animate-openmodal w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    : "animate-closemodal w-full justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                }>
                <div className="relative flex max-h-full w-full max-w-lg mx-4">
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
                                Hipervínculos generados
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="space-y-2 max-h-64 overflow-y-auto">                                    
                                {
                                    Object.keys(data).map((key, index) => { 
                                        return (
                                            <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 dark:bg-neutral-800 
                                                border border-gray-100 dark:border-neutral-700 group hover:bg-primary-50 dark:hover:bg-primary-950/20 transition-colors">
                                                <div className="p-1 bg-primary-100 dark:bg-primary-900/50 rounded-lg flex-shrink-0">
                                                    <IoLinkOutline className="w-3.5 h-3.5 text-primary-600 dark:text-primary-400" />
                                                </div>
                                                <a 
                                                    href={data[index].hipervinculo} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="text-sm text-primary-700 dark:text-primary-400 hover:underline underline-offset-2 truncate"
                                                >
                                                    {data[index].hipervinculo}
                                                </a>
                                            </div>
                                        )
                                    })
                                }
                            </div>
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

