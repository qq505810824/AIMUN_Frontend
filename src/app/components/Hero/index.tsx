'use client';
import { useLang } from '@/context/lang-context';

const bg = './archive/59831757665060_.pic_hd.jpg';


interface ViewProps {
    T: any;
    goRegister: any;
    goAbout: any;
    setAboutTab: any;
}

export function Hero({
    T,
    goRegister,
    goAbout,
    setAboutTab
}: ViewProps) {
    const { L } = useLang();
    return (
        <section className="relative">
            <img
                src={bg}
                alt="Macau skyline"
                className="h-[70vh] w-full object-cover"
            />
            <div className="bg-gray-100"></div>
            <div className="absolute inset-0 bg-slate-900/50" />
            <div className="absolute inset-0 flex items-center">
                <div className="mx-auto max-w-7xl px-4 pt-0 sm:pt-0">
                    <div className="max-w-3xl text-white">
                        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur">
                            <span>Oct 24–26, 2025</span>
                            <span className="opacity-60">•</span>
                            <span>Macau SAR</span>
                        </p>
                        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                            {T.hero.title}
                        </h1>
                        <p className="mt-4 text-slate-100/90 text-lg md:text-xl">
                            {T.hero.subtitle}
                        </p>
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <button
                                onClick={goRegister}
                                className="rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 shadow"
                            >
                                {T.ctaRegister}
                            </button>
                            <button
                                onClick={() => {
                                    goAbout();
                                    setAboutTab('sef');
                                }}
                                className="rounded-xl border border-white/40 px-5 py-3 text-white hover:bg-white/10"
                            >
                                {T.ctaLearnMore}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
