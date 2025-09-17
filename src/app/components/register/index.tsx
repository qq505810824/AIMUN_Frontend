'use client';
import { LangKey } from '@/app/(commonLayout)/home/page';
import { useLang } from '@/context/lang-context';

interface ViewProps {
    T: any;
    lang: LangKey;
}

export const Register = ({ T, lang }: ViewProps) => {
    const { L } = useLang();
    return (
        <main id="register" className="mx-auto max-w-7xl px-4 py-12">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold">{T.nav.register}</h2>
                    <p className="mt-2 text-slate-600 max-w-3xl">{T.register.lead}</p>
                </div>
                <a
                    href="https://qr61.cn/oOux00/qKbdeKf"
                    target="_blank"
                    className="rounded-xl border text-slate-700  text-sm border-slate-300 px-4 py-1 hover:bg-slate-100"
                >
                    {T.register.viewDetail}
                </a>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                    <h3 className="text-xl font-semibold">{T.register.educators.title}</h3>
                    <ul className="mt-3 space-y-1 text-slate-700 list-disc pl-5">
                        {T.register.educators.items.map((x: string, i: number) => (
                            <li key={i}>{x}</li>
                        ))}
                    </ul>
                    <div className="mt-4 flex gap-3">
                        <a
                            href="https://forms.office.com/r/Y31c6n6Cu8"
                            target="_blank"
                            className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                        >
                            {T.register.btnIndividual}
                        </a>
                        {/* <a
                            href="#"
                            className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100"
                        >
                            {T.register.btnGroup}
                        </a> */}
                    </div>
                </div>

                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                    <h3 className="text-xl font-semibold">{T.register.students.title}</h3>
                    <ul className="mt-3 space-y-1 text-slate-700 list-disc pl-5">
                        {T.register.students.items.map((x: string, i: number) => (
                            <li key={i}>{x}</li>
                        ))}
                    </ul>
                    <div className="mt-4 flex gap-3">
                        <a
                            href="https://forms.office.com/r/RZ5MxqKXmf"
                            target="_blank"
                            className="rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700"
                        >
                            {T.register.btnIndividualStudent}
                        </a>
                        <a
                            href="https://qr61.cn/oOux00/qpwAOcp"
                            target="_blank"
                            className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100"
                        >
                            {T.register.btnGroup}
                        </a>
                    </div>
                </div>
            </div>
            {/* 
            <div className="mt-6 rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold">{T.register.addons.title}</h4>
                <ul className="mt-2 space-y-1 text-slate-700 list-disc pl-5">
                    {T.register.addons.items.map((x: string, i: number) => (
                        <li key={i}>{x}</li>
                    ))}
                </ul>
            </div> */}
        </main>
    );
};
