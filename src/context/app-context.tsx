'use client';

import type { User } from '@/models/common';

import type { FC, ReactNode } from 'react';
import { createRef, useRef, useState } from 'react';
import { createContext, useContext, useContextSelector } from 'use-context-selector';

export type AppContextValue = {
    userProfile?: User;
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
    userProfile: {
        id: '',
        nickname: '',
        role: '',
        email: '',
        aienglish_feature_list: [],
        meta: {},
        school: undefined,
        teaching_assignments: [],
        enrollments: []
    },
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
    const [userProfile, setUserProfile] = useState<User>({
        id: '',
        nickname: '',
        email: '',
        role: '',
        aienglish_feature_list: [],
        meta: {},
        school: undefined,
        teaching_assignments: [],
        enrollments: []
    });


    return (
        <AppContext.Provider
            value={{
                userProfile,
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
