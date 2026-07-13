
export const LoadingButton = () => {
    return (
        <span className="inline-flex items-center gap-2">
            <svg
                aria-hidden="true"
                role="status"
                className="w-4 h-4 text-white/30 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path
                    className="opacity-90"
                    fill="white"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
            </svg>
            <span>
                Procesando
                <span className="inline-flex w-5 justify-start">
                    <span className="animate-[dot-pulse_1.4s_ease-in-out_0s_infinite]">.</span>
                    <span className="animate-[dot-pulse_1.4s_ease-in-out_0.2s_infinite]">.</span>
                    <span className="animate-[dot-pulse_1.4s_ease-in-out_0.4s_infinite]">.</span>
                </span>
            </span>
        </span>
    )
}
