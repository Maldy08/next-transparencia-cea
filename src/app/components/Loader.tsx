import { ReactNode, useState } from "react";

export const Loader = ( {component}: { component: React.ReactNode}) => {
    const [loading, setLoading] = useState(true);
    return (component : ReactNode) => {


        setTimeout(() => {
            setLoading(false);
        }, 2000);

        return (
            <>
                {loading ? <div>Loading...</div> : component}
            </>
        )
    }
}

Loader.displayName = "Loader";