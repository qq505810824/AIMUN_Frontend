'use client';
import { createContext, useContext, useMemo, useState } from 'react';

// 定义 LangKey 类型
type LangKey = 'en' | 'zh';

type LangContextType = {
    lang: LangKey;
    setLang: (lang: LangKey) => void;
    showBoth: boolean;
    setShowBoth: (showBoth: boolean) => void;
    L: (en: string, zh: string) => string | JSX.Element;
};

const LangCtx = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState<LangKey>('en'); // 明确指定类型为 LangKey
    const [showBoth, setShowBoth] = useState(false);

    const L = (en: string, zh: string) => {
        if (showBoth)
            return (
                <span>
                    {en} <span className="text-slate-500">/ {zh}</span>
                </span>
            );
        return lang === 'en' ? en : zh;
    };

    const value = useMemo(() => ({ lang, setLang, showBoth, setShowBoth, L }), [lang, showBoth]);

    return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang() {
    const ctx = useContext(LangCtx);
    if (!ctx) throw new Error('useLang must be used within LangProvider');
    return ctx;
}