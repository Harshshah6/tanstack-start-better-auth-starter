import React, { createContext, useContext, useState } from "react";
import { LoaderIcon } from "lucide-react";

interface LoaderContextProps {
    showLoader: () => void;
    hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextProps | null>(null);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);

    const showLoader = () => setVisible(true);
    const hideLoader = () => setVisible(false);

    return (
        <LoaderContext.Provider value={{ showLoader, hideLoader }}>
            {children}
            {visible && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm z-100">
                    <LoaderIcon className="size-8 text-white animate-spin" />
                </div>
            )}
        </LoaderContext.Provider>
    );
};

export const useLoader = () => {
    const ctx = useContext(LoaderContext);
    if (!ctx) throw new Error("useLoader must be used inside LoaderProvider");
    return ctx;
};
