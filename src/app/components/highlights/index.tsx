'use client';

import { LangKey } from "@/app/(commonLayout)/home/page";



interface ViewProps {
    T: any;
    lang: LangKey;
}

export const Highlights = ({
    T,
    lang
}: ViewProps) => {

    const cards = T.highlights.cards;

    return (
        <>
            <main className="mx-auto max-w-7xl px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-extrabold">{T.nav.highlights}</h2>
                <p className="mt-2 text-slate-600 max-w-3xl">{T.highlights.lead}</p>
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((c: any, i: number) => (
                        <div
                            key={i}
                            className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm"
                        >
                            <img src={c.img} alt={c.t} className="h-44 w-full object-cover" />
                            <div className="p-5">
                                <h3 className="text-lg font-semibold">{c.t}</h3>
                                <p className="mt-1 text-slate-600">{c.d}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    )
}
