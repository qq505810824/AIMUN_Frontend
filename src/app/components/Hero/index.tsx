'use client'
import { useLang } from '@/context/lang-context'

const HERO = 'https://source.unsplash.com/featured/1600x600/?conference,stage'

export function Hero() {
    const { L } = useLang()
    return (
        <div className="relative text-white">
            <img src={HERO} alt="AIMUN hero" className="w-full h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/70 to-sky-500/70" />
            <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-6xl px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-2">
                        {L('Asia Pacific International Model United Nations 2025', '亞太區國際模擬聯合國 2025')}
                    </h1>
                    <p className="text-base md:text-lg max-w-2xl">
                        {L('October 25–26, 2025 • Macau SAR, China', '2025年10月25–26日 • 澳門特別行政區')}
                    </p>
                </div>
            </div>
        </div>
    )
}