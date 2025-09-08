"use client"
import { createContext, useContext, useMemo, useState } from 'react'

type LangContextType = {
    lang: string
    setLang: (lang: string) => void
    showBoth: boolean
    setShowBoth: (showBoth: boolean) => void
    L: (en: string, zh: string) => string | JSX.Element
}

const LangCtx = createContext<LangContextType | null>(null)

export function LangProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLang] = useState('en') // 'en' | 'zh'
    const [showBoth, setShowBoth] = useState(false)

    const L = (en: string, zh: string) => {
        if (showBoth) return (
            <span>
                {en} <span className="text-slate-500">/ {zh}</span>
            </span>
        )
        return lang === 'en' ? en : zh
    }

    const value = useMemo(
        () => ({ lang, setLang, showBoth, setShowBoth, L }),
        [lang, showBoth]
    )

    return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>
}

export function useLang() {
    const ctx = useContext(LangCtx)
    if (!ctx) throw new Error('useLang must be used within LangProvider')
    return ctx
}