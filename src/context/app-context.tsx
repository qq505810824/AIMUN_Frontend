'use client';

import type { FC, ReactNode } from 'react';
import { createRef, useRef } from 'react';
import { createContext, useContext, useContextSelector } from 'use-context-selector';

export type AppContextValue = {
    pageContainerRef: React.RefObject<HTMLDivElement>;
    useSelector: typeof useSelector;
};

const initialLangeniusVersionInfo = {
    current_env: '',
    current_version: '',
    latest_version: '',
    release_date: '',
    release_notes: '',
    version: '',
    can_auto_update: false
};

const AppContext = createContext<AppContextValue>({
    pageContainerRef: createRef(),
    useSelector
});

export function useSelector<T>(selector: (value: AppContextValue) => T): T {
    return useContextSelector(AppContext, selector);
}

export type AppContextProviderProps = {
    children: ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const pageContainerRef = useRef<HTMLDivElement>(null);

    return (
        <AppContext.Provider
            value={{
                pageContainerRef,
                useSelector
            }}
        >
            <div className="flex flex-col   items-center w-full h-full overflow-y-auto">
                <div
                    ref={pageContainerRef}
                    className="min-h-screen w-full   from-white to-gray-50 text-gray-900"
                >
                    {children}
                </div>
            </div>
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);

export default AppContext;
