
export const Progress = () => {
    return (
        <div className="py-10">
            <div className="flex flex-col items-center gap-3">
                <div className="relative">
                    {/* Outer glow */}
                    <div className="absolute inset-0 rounded-full blur-md bg-primary-400/20 animate-pulse" />
                    {/* Spinner */}
                    <div
                        className="relative inline-block h-9 w-9 animate-spin rounded-full
                            border-[3px] border-solid border-primary-200 dark:border-primary-900
                            border-t-primary-700 dark:border-t-primary-400"
                        role="status"
                    >
                        <span className="sr-only">Cargando...</span>
                    </div>
                </div>
                <span className="text-sm text-gray-400 dark:text-neutral-500 font-medium">
                    Cargando
                    <span className="inline-flex w-6 justify-start">
                        <span className="animate-[dot-pulse_1.4s_ease-in-out_0s_infinite] mx-[1px]">.</span>
                        <span className="animate-[dot-pulse_1.4s_ease-in-out_0.2s_infinite] mx-[1px]">.</span>
                        <span className="animate-[dot-pulse_1.4s_ease-in-out_0.4s_infinite] mx-[1px]">.</span>
                    </span>
                </span>
            </div>
        </div>
    )
}
