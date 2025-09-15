import { LangKey } from '@/app/(commonLayout)/home/page';
import { useLang } from '@/context/lang-context';

interface ViewProps {
    T: any;
    lang: LangKey;
    aboutTab: string;
    setAboutTab: any;
}

const About = ({ T, lang, aboutTab, setAboutTab }: ViewProps) => {
    const { L } = useLang();
    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold">{T.about.title}</h2>
            <p className="mt-2 text-slate-600 max-w-3xl">{T.about.lead}</p>

            <div className="mt-6 inline-flex rounded-xl border border-slate-300 bg-white overflow-hidden">
                {[
                    { id: 'sef', label: T.about.tabs.sef },
                    { id: 'aimun', label: T.about.tabs.aimun },
                    { id: 'un', label: T.about.tabs.un }
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setAboutTab(t.id)}
                        className={`px-4 py-2 text-sm ${aboutTab === t.id ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
                {aboutTab === 'sef' && (
                    <>
                        <AboutCard
                            img="./archive/59851757665119_.pic_hd.jpg"
                            title={T.about.sef.title}
                            description={T.about.sef.description}
                            tag={T.about.tabs.sef}
                        />
                        <AboutInfo
                            title={T.about.sef.infoTitle}
                            lines={T.about.sef.info}
                            points_title={T.about.un.points_title}
                            points={T.about.sef.points}
                        />
                    </>
                )}
                {aboutTab === 'aimun' && (
                    <>
                        <AboutCard
                            img="./archive/model_un_landing_page.jpg"
                            title={T.about.aimun.title}
                            description={T.about.aimun.description}
                            tag={T.about.tabs.aimun}
                        />
                        <AboutInfo
                            title={T.about.aimun.infoTitle}
                            lines={T.about.aimun.info}
                            points_title={T.about.un.points_title}
                            points={T.about.aimun.points}
                        />
                    </>
                )}
                {aboutTab === 'un' && (
                    <>
                        <AboutCard
                            img="./archive/UN-75-tile700x400.jpg"
                            title={T.about.un.title}
                            description={T.about.un.description}
                            tag={T.about.tabs.un}
                        />
                        <AboutInfo
                            title={T.about.un.infoTitle}
                            lines={T.about.un.info}
                            points_title={T.about.un.points_title}
                            points={T.about.un.points}
                        />
                    </>
                )}
            </div>
        </main>
    );
};

export default About;

function AboutCard({
    img,
    title,
    description,
    tag
}: {
    img: string;
    title: string;
    description: string;
    tag: string;
}) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
            <img src={img} alt={title} className="h-56 w-full object-cover" />
            <div className="p-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-3 py-1 text-xs">
                    {tag}
                </div>
                <h3 className="mt-3 text-xl font-semibold">{title}</h3>
                <h5 className="mt-3 space-y-2 text-slate-700 list-disc">{description}</h5>
            </div>
        </div>
    );
}

function AboutInfo({
    title,
    lines,
    points_title,
    points
}: {
    title: string;
    lines: string[];
    points_title: string;
    points: string[];
}) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold">{title}</h4>
            <div className="mt-3 space-y-1 text-slate-700">
                {lines.map((l: string, idx: number) => (
                    <p key={idx}>• {l}</p>
                ))}
            </div>

            <div className="mt-6">
                <h4 className="text-lg font-semibold">{points_title}</h4>
                <div className="mt-3 space-y-1 text-slate-700">
                    {points?.map((b: string, idx: number) => <p key={idx}>• {b}</p>)}
                </div>
            </div>
        </div>
    );
}
