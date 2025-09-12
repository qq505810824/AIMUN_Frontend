'use client';
import { useMemo, useState } from 'react';

export default function App() {
    const [lang, setLang] = useState<LangKey>('en');
    const [tab, setTab] = useState('home');
    const [aboutTab, setAboutTab] = useState('sef');

    const T = useMemo(() => translations[lang], [lang]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/1/17/United_Nations_University_logo.svg"
                            alt="UNU"
                            className="h-6"
                        />
                        <span className="text-sm text-slate-400">•</span>
                        <img
                            src="https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=600&auto=format&fit=crop"
                            alt="AAIA"
                            className="h-6 rounded"
                        />
                        <span className="text-sm text-slate-400">•</span>
                        <span className="font-semibold">MIMUN Youth Association</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LangSwitcher lang={lang} setLang={setLang} />
                        <a
                            href="#register"
                            onClick={(e) => {
                                e.preventDefault();
                                setTab('register');
                            }}
                            className="ml-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 shadow"
                        >
                            {T.ctaRegister}
                        </a>
                    </div>
                </div>
                <nav className="mx-auto max-w-7xl px-4 pb-3">
                    <ul className="flex flex-wrap gap-2">
                        {[
                            { id: 'home', label: T.nav.home },
                            { id: 'about', label: T.nav.about },
                            { id: 'highlights', label: T.nav.highlights },
                            { id: 'register', label: T.nav.register },
                            { id: 'contact', label: T.nav.contact }
                        ].map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() => setTab(item.id)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 ${tab === item.id ? 'bg-slate-900 text-white hover:bg-slate-900' : ''}`}
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>

            {tab === 'home' && (
                <Home
                    lang={lang}
                    T={T}
                    goRegister={() => setTab('register')}
                    goAbout={() => setTab('about')}
                    setAboutTab={setAboutTab}
                />
            )}
            {tab === 'about' && (
                <About lang={lang} T={T} aboutTab={aboutTab} setAboutTab={setAboutTab} />
            )}
            {tab === 'highlights' && <Highlights T={T} />}
            {tab === 'register' && <Register T={T} />}
            {tab === 'contact' && <Contact T={T} />}

            <footer className="mt-16 border-t border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500 flex flex-col md:flex-row items-center md:justify-between gap-4">
                    <p>© 2025 AIMUN · Smart Education Forum · UN Experience Day — Macau</p>
                    <p className="opacity-75">Wynn Palace • UNU Macau</p>
                </div>
            </footer>
        </div>
    );
}

function LangSwitcher({ lang, setLang }: { lang: LangKey; setLang: (l: LangKey) => void }) {
    return (
        <div className="inline-flex rounded-xl border border-slate-300 bg-white overflow-hidden">
            {(['en', 'zh'] as LangKey[]).map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 text-sm ${lang === l ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}
                >
                    {l === 'en' ? 'EN' : '繁體'}
                </button>
            ))}
        </div>
    );
}

function Home({
    lang,
    T,
    goRegister,
    goAbout,
    setAboutTab
}: {
    lang: LangKey;
    T: any;
    goRegister: () => void;
    goAbout: () => void;
    setAboutTab: (tab: string) => void;
}) {
    return (
        <main>
            {/* HERO */}
            <section className="relative">
                <img
                    src="https://images.unsplash.com/photo-1510308522-cb1a3511c3bd?q=80&w=2400&auto=format&fit=crop"
                    alt="Macau skyline"
                    className="h-[60vh] w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/60" />
                <div className="absolute inset-0 flex items-center">
                    <div className="mx-auto max-w-7xl px-4">
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

            {/* THREE EVENTS (pretty cards with photos) */}
            <section className="mx-auto max-w-7xl px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-extrabold">
                    {T.homeSections.events.title}
                </h2>
                <p className="mt-2 text-slate-600 max-w-3xl">{T.homeSections.events.lead}</p>
                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <EventCard
                        img="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop"
                        tag="SEF"
                        title={T.homeSections.events.cards[0].t}
                        desc={T.homeSections.events.cards[0].d}
                        onClick={() => {
                            goAbout();
                            setAboutTab('sef');
                        }}
                    />
                    <EventCard
                        img="https://images.unsplash.com/photo-1573496774426-fe3db3dd1733?q=80&w=1600&auto=format&fit=crop"
                        tag="AIMUN"
                        title={T.homeSections.events.cards[1].t}
                        desc={T.homeSections.events.cards[1].d}
                        onClick={() => {
                            goAbout();
                            setAboutTab('aimun');
                        }}
                    />
                    <EventCard
                        img="https://images.unsplash.com/photo-1603565816271-011a46b0cc8e?q=80&w=1600&auto=format&fit=crop"
                        tag="UN Day"
                        title={T.homeSections.events.cards[2].t}
                        desc={T.homeSections.events.cards[2].d}
                        onClick={() => {
                            goAbout();
                            setAboutTab('un');
                        }}
                    />
                </div>
            </section>

            {/* QUICK FACTS (keep the boxes) */}
            <section className="mx-auto max-w-7xl px-4 pb-12">
                <div className="grid md:grid-cols-3 gap-6">
                    {T.quickFacts.map((q: any, i: number) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-white shadow-sm border border-slate-200 p-6"
                        >
                            <div className="flex items-start gap-3">
                                <img
                                    src={icons[i % icons.length]}
                                    alt=""
                                    className="h-10 w-10 rounded"
                                />
                                <div>
                                    <h3 className="text-slate-900 font-semibold">{q.t}</h3>
                                    <p className="mt-2 text-slate-600">{q.d}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* AT A GLANCE (mini schedule timeline) */}
            <section className="mx-auto max-w-7xl px-4 pb-12">
                <h3 className="text-xl font-bold">{T.homeSections.glance.title}</h3>
                <div className="mt-4 grid md:grid-cols-3 gap-6">
                    {T.homeSections.glance.items.map((it: any, idx: number) => (
                        <div
                            key={idx}
                            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
                        >
                            <img src={it.img} alt="" className="h-40 w-full object-cover" />
                            <div className="p-5">
                                <div className="text-xs text-slate-500">{it.date}</div>
                                <div className="mt-1 font-semibold">{it.title}</div>
                                <p className="mt-1 text-slate-600 text-sm">{it.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* VENUES */}
            <section className="mx-auto max-w-7xl px-4 pb-12">
                <h3 className="text-xl font-bold">{T.homeSections.venues.title}</h3>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                    <VenueCard
                        title="UNU Macau"
                        subtitle={
                            lang === 'en'
                                ? 'Casa Silva Mendes • UNESCO district'
                                : '聯合國大學駐澳門研究所（世遺區）'
                        }
                        img="https://images.unsplash.com/photo-1566977744263-86d3e6b9e8f1?q=80&w=1600&auto=format&fit=crop"
                    />
                    <VenueCard
                        title="Wynn Palace"
                        subtitle={lang === 'en' ? 'Grand Theatre • Cotai' : '永利皇宮（路氹城）'}
                        img="https://images.unsplash.com/photo-1523731407965-2430cd12f5e4?q=80&w=1600&auto=format&fit=crop"
                    />
                </div>
            </section>

            {/* FEATURED SPEAKERS */}
            <section className="mx-auto max-w-7xl px-4 pb-12">
                <h3 className="text-xl font-bold">{T.homeSections.speakers.title}</h3>
                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {T.homeSections.speakers.items.map((s: any, i: number) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
                        >
                            <img src={s.img} alt={s.name} className="h-44 w-full object-cover" />
                            <div className="p-5">
                                <div className="font-semibold">{s.name}</div>
                                <div className="text-sm text-slate-600">{s.role}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PACKAGES SNAPSHOT */}
            <section className="mx-auto max-w-7xl px-4 pb-12">
                <h3 className="text-xl font-bold">{T.homeSections.packages.title}</h3>
                <div className="mt-4 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                        <h4 className="text-lg font-semibold">
                            {T.homeSections.packages.educators.title}
                        </h4>
                        <ul className="mt-2 space-y-1 text-slate-700 list-disc pl-5">
                            {T.homeSections.packages.educators.items.map((x: string, i: number) => (
                                <li key={i}>{x}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                        <h4 className="text-lg font-semibold">
                            {T.homeSections.packages.students.title}
                        </h4>
                        <ul className="mt-2 space-y-1 text-slate-700 list-disc pl-5">
                            {T.homeSections.packages.students.items.map((x: string, i: number) => (
                                <li key={i}>{x}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ORGANIZERS */}
            <section className="mx-auto max-w-7xl px-4 pb-16">
                <h3 className="text-xl font-bold">{T.homeSections.organizers.title}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-6 opacity-80">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/1/17/United_Nations_University_logo.svg"
                        className="h-8"
                        alt="UNU"
                    />
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/4/4e/United_Nations_Emblem_Blue.svg"
                        className="h-10"
                        alt="UN"
                    />
                    <img
                        src="https://images.unsplash.com/photo-1567789884554-0b844b597180?q=80&w=200&auto=format&fit=crop"
                        className="h-8 rounded"
                        alt="AAIA"
                    />
                    <span className="text-slate-700 font-medium">MIMUN Youth Association</span>
                </div>
            </section>
        </main>
    );
}

function EventCard({
    img,
    tag,
    title,
    desc,
    onClick
}: {
    img: string;
    tag: string;
    title: string;
    desc: string;
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="text-left group overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm"
        >
            <div className="relative">
                <img
                    src={img}
                    alt={title}
                    className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full bg-slate-900/90 text-white px-3 py-1 text-xs">
                    {tag}
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-slate-600 text-sm">{desc}</p>
                <span className="mt-3 inline-block text-blue-700 text-sm">Learn more →</span>
            </div>
        </button>
    );
}

function VenueCard({ title, subtitle, img }: { title: string; subtitle: string; img: string }) {
    return (
        <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
            <img src={img} alt={title} className="h-48 w-full object-cover" />
            <div className="p-5">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-slate-600">{subtitle}</p>
            </div>
        </div>
    );
}

function About({
    lang,
    T,
    aboutTab,
    setAboutTab
}: {
    lang: LangKey;
    T: any;
    aboutTab: string;
    setAboutTab: (tab: string) => void;
}) {
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
                            img="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1600&auto=format&fit=crop"
                            title={T.about.sef.title}
                            bullets={T.about.sef.points}
                            tag="SEF"
                        />
                        <AboutInfo title={T.about.sef.infoTitle} lines={T.about.sef.info} />
                    </>
                )}
                {aboutTab === 'aimun' && (
                    <>
                        <AboutCard
                            img="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1600&auto=format&fit=crop"
                            title={T.about.aimun.title}
                            bullets={T.about.aimun.points}
                            tag="AIMUN"
                        />
                        <AboutInfo title={T.about.aimun.infoTitle} lines={T.about.aimun.info} />
                    </>
                )}
                {aboutTab === 'un' && (
                    <>
                        <AboutCard
                            img="https://images.unsplash.com/photo-1603565816271-011a46b0cc8e?q=80&w=1600&auto=format&fit=crop"
                            title={T.about.un.title}
                            bullets={T.about.un.points}
                            tag="UN Day"
                        />
                        <AboutInfo title={T.about.un.infoTitle} lines={T.about.un.info} />
                    </>
                )}
            </div>
        </main>
    );
}

function AboutCard({
    img,
    title,
    bullets,
    tag
}: {
    img: string;
    title: string;
    bullets: string[];
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
                <ul className="mt-3 space-y-2 text-slate-700 list-disc pl-5">
                    {bullets.map((b: string, idx: number) => (
                        <li key={idx}>{b}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function AboutInfo({ title, lines }: { title: string; lines: string[] }) {
    return (
        <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
            <h4 className="text-lg font-semibold">{title}</h4>
            <div className="mt-3 space-y-1 text-slate-700">
                {lines.map((l: string, idx: number) => (
                    <p key={idx}>• {l}</p>
                ))}
            </div>
        </div>
    );
}

function Highlights({ T }: { T: any }) {
    const cards = T.highlights.cards;
    return (
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
    );
}

function Register({ T }: { T: any }) {
    return (
        <main id="register" className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold">{T.nav.register}</h2>
            <p className="mt-2 text-slate-600 max-w-3xl">{T.register.lead}</p>

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
                            href="#"
                            className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700"
                        >
                            {T.register.btnIndividual}
                        </a>
                        <a
                            href="#"
                            className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100"
                        >
                            {T.register.btnGroup}
                        </a>
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
                            href="#"
                            className="rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700"
                        >
                            {T.register.btnIndividual}
                        </a>
                        <a
                            href="#"
                            className="rounded-xl border border-slate-300 px-4 py-2 hover:bg-slate-100"
                        >
                            {T.register.btnGroup}
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                <h4 className="text-lg font-semibold">{T.register.addons.title}</h4>
                <ul className="mt-2 space-y-1 text-slate-700 list-disc pl-5">
                    {T.register.addons.items.map((x: string, i: number) => (
                        <li key={i}>{x}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

function Contact({ T }: { T: any }) {
    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold">{T.nav.contact}</h2>
            <div className="mt-4 grid md:grid-cols-2 gap-6">
                <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
                    <dl className="space-y-2 text-slate-700">
                        <div>
                            <dt className="font-semibold">Email</dt>
                            <dd>aimun@moimun.org</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">WhatsApp</dt>
                            <dd>+852 4410 6234</dd>
                        </div>
                        <div>
                            <dt className="font-semibold">Phone</dt>
                            <dd>+853 6687 0988</dd>
                        </div>
                    </dl>
                </div>
                <div className="overflow-hidden rounded-2xl bg-white border border-slate-200 shadow-sm">
                    <img
                        src="https://images.unsplash.com/photo-1523246199205-3b11038f630f?q=80&w=1600&auto=format&fit=crop"
                        alt="Forum"
                        className="h-64 w-full object-cover"
                    />
                </div>
            </div>
        </main>
    );
}

// ICONS for quick facts
const icons = [
    'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=200&auto=format&fit=crop'
];

// ------------------ COPY: Translations ------------------

type LangKey = 'en' | 'zh';

const translations: Record<LangKey, any> = {
    en: {
        ctaRegister: 'Register Now',
        ctaLearnMore: 'Learn More',
        nav: {
            home: 'Home',
            about: 'About',
            highlights: 'Event Highlights',
            register: 'Register',
            contact: 'Contact'
        },
        hero: {
            title: '2025 Smart Education Forum · AIMUN & UN Experience Day',
            subtitle:
                'Celebrating the UN 80th & UNU 50th milestones in Macau — bringing together educators, students, and global leaders to explore how AI and Education shape the future of learning, leadership, and cooperation.'
        },
        quickFacts: [
            {
                t: '3-in-1 Program',
                d: 'Smart Education Forum, AIMUN Conference, UN Experience Day (Oct 24–26, 2025).'
            },
            {
                t: 'UNU / UNESCO Certificates',
                d: 'Earn recognized certificates through keynotes, workshops, simulations, and practice.'
            },
            {
                t: 'Venues',
                d: 'Wynn Palace Macau & United Nations University Institute in Macau (UNU Macau).'
            }
        ],
        homeSections: {
            events: {
                title: 'Three Signature Events',
                lead: 'A unified program designed for educators and students across the Asia-Pacific region.',
                cards: [
                    {
                        t: 'Smart Education Forum (SEF)',
                        d: 'For school principals and educators — keynotes, workshops, innovation showcases.'
                    },
                    {
                        t: 'AIMUN Conference',
                        d: 'For students — AI-integrated MUN with committees, debates, and awards.'
                    },
                    {
                        t: 'UN Experience Day',
                        d: 'For students aged 10–25 — SDG workshops, heritage exploration, and UN engagement.'
                    }
                ]
            },
            glance: {
                title: 'At a Glance',
                items: [
                    {
                        date: 'Oct 24',
                        title: 'Opening & AI Education Program',
                        desc: 'UNU milestone sessions, industry keynotes, youth incubation.',
                        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                        date: 'Oct 25',
                        title: 'SEF + AIMUN Day',
                        desc: 'High-level plenary, forum tracks, committee sessions, gala dinner.',
                        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                        date: 'Oct 26',
                        title: 'Committees & UNU Visit',
                        desc: 'Final debates, heritage study, visit UNU Macau, closing ceremony.',
                        img: 'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?q=80&w=1600&auto=format&fit=crop'
                    }
                ]
            },
            venues: { title: 'Venues' },
            speakers: {
                title: 'Featured Speakers',
                items: [
                    {
                        name: 'Prof. Tshilidzi Marwala',
                        role: 'Rector, United Nations University',
                        img: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop'
                    },
                    {
                        name: 'UNESCO Chair in AI',
                        role: 'Exclusive Workshop Lead',
                        img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop'
                    },
                    {
                        name: 'Microsoft AI for Good',
                        role: 'Keynote Speaker',
                        img: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=800&auto=format&fit=crop'
                    },
                    {
                        name: 'NVIDIA AI Tech Centre',
                        role: 'Industry Session',
                        img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop'
                    }
                ]
            },
            packages: {
                title: 'Packages Snapshot',
                educators: {
                    title: 'For Principals & Educators (SEF)',
                    items: [
                        'Package A — General Pass: Forum access + luncheon',
                        'Package B — Full Pass: Includes educational field visit (Oct 26)',
                        'Add-on: UNESCO Chair in AI workshop (by request)'
                    ]
                },
                students: {
                    title: 'For Students (AIMUN & UN Experience Day)',
                    items: [
                        'UN Experience Day — Full Pass',
                        'MUN — General Pass / Full Pass',
                        'Add-ons: Residential package, 2-week Leadership Camp (Oct 6–17)'
                    ]
                }
            },
            organizers: { title: 'Organizers & Partners' }
        },
        about: {
            title: 'About the Events',
            lead: 'Designed for principals, educators, and students (ages 10–25). Explore AI in education, diplomacy, and global governance with UNU Macau and partners.',
            tabs: { sef: 'SEF', aimun: 'AIMUN', un: 'UN Experience Day' },
            sef: {
                title: 'Smart Education Forum (SEF) — For Principals & Educators',
                points: [
                    'Keynote by UNU Rector Prof. Tshilidzi Marwala',
                    'Exclusive workshop with the UNESCO Chair in AI',
                    'Demonstration classrooms & innovative school projects',
                    'Admissions insights from the University of Hong Kong (HKU)',
                    'UNU-certified certificates'
                ],
                infoTitle: 'Details',
                info: [
                    'Date: Oct 25, 2025',
                    'Venue: Wynn Palace',
                    'Audience: Principals & Educators'
                ]
            },
            aimun: {
                title: 'AIMUN Conference — For Grade 4–12 & University Students',
                points: [
                    'First AI-integrated MUN in close collaboration with the United Nations University',
                    'Committees include ILO, WTO, GA1, UNEP, WHO',
                    "Outstanding resolutions submitted to the UN Secretary-General's office",
                    'Mentorship from experienced MUN advisors and UN officials'
                ],
                infoTitle: 'Details',
                info: [
                    'Dates: Oct 25–26, 2025',
                    'Venues: UNU Macau & Wynn Palace',
                    'Languages: EN / 中文'
                ]
            },
            un: {
                title: 'UN Experience Day — For Students aged 10–25',
                points: [
                    'Hands-on SDG workshops & heritage exploration',
                    'Engage with UN officials and industry leaders',
                    'AI ethics & global governance sessions',
                    'UNU-recognized practice certificate'
                ],
                infoTitle: 'Details',
                info: [
                    'Dates: Oct 25–26, 2025',
                    'Venues: UNU Macau & around Macau',
                    'Audience: Ages 10–25'
                ]
            }
        },
        highlights: {
            lead: 'A curated program combining high-level forums, hands-on simulations, and cultural immersion.',
            cards: [
                {
                    t: 'Cross-Disciplinary Forum',
                    d: 'Global perspectives on AI + Education with policy and practice.',
                    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop'
                },
                {
                    t: 'Top Speakers',
                    d: 'UNU Rector, UNESCO Chair in AI, Microsoft AI for Good, NVIDIA AI Technology Centre.',
                    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
                },
                {
                    t: 'Practice & Recognition',
                    d: 'UNU/UNESCO certificates, project incubation, and youth innovation network.',
                    img: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop'
                }
            ]
        },
        register: {
            lead: 'Choose your path and secure your spot. Early-bird deadline: Sep 25, 2025.',
            btnIndividual: 'Individual',
            btnGroup: 'Group / School',
            educators: {
                title: 'For Principals & Educators (SEF)',
                items: [
                    'Package A — General Pass: Forum access + luncheon',
                    'Package B — Full Pass: Includes educational field visit (Oct 26)',
                    'Add-on: Exclusive workshop with UNESCO Chair in AI (by request)'
                ]
            },
            students: {
                title: 'For Students (AIMUN & UN Experience Day)',
                items: [
                    'UN Experience Day — Full Pass',
                    'MUN — General Pass / Full Pass',
                    'Add-ons: Residential package, 2-week AIMUN Leadership Camp (Oct 6–17)'
                ]
            },
            addons: {
                title: 'Add-ons',
                items: [
                    'Residential packages with local transportation',
                    'AIMUN Leadership Camp (online, evenings, Oct 6–17)'
                ]
            }
        }
    },
    zh: {
        ctaRegister: '立即報名',
        ctaLearnMore: '了解更多',
        nav: {
            home: '首頁',
            about: '關於',
            highlights: '活動亮點',
            register: '報名',
            contact: '聯絡'
        },
        hero: {
            title: '2025 智慧教育論壇 · AIMUN 亞太模聯 · 聯合國體驗日',
            subtitle:
                '聯合國80週年、聯合國大學50週年里程碑系列於澳門舉行—匯聚教育者、學生與國際領袖，探索人工智能與教育如何塑造學習、領導力與全球合作的未來。'
        },
        quickFacts: [
            {
                t: '三合一活動',
                d: '智慧教育論壇、模擬聯合國大會、聯合國體驗日（2025年10月24–26日）。'
            },
            { t: 'UNU / UNESCO 證書', d: '透過主題演講、工作坊與模擬實踐，獲得國際認可證書。' },
            { t: '場地', d: '永利皇宮 • 聯合國大學駐澳門研究所（UNU Macau）。' }
        ],
        homeSections: {
            events: {
                title: '三大核心活動',
                lead: '為亞太地區教育者與學生量身打造的一體化計劃。',
                cards: [
                    {
                        t: '智慧教育論壇（SEF）',
                        d: '校長與教育者參與：主題演講、工作坊、創新展示。'
                    },
                    { t: 'AIMUN 模聯大會', d: '學生參與：AI 結合模聯，委員會辯論與獎項。' },
                    { t: '聯合國體驗日', d: '10–25歲學生：SDG 工作坊、文化探索、聯合國互動。' }
                ]
            },
            glance: {
                title: '重點行程',
                items: [
                    {
                        date: '10/24',
                        title: '開幕 & AI 教育日程',
                        desc: 'UNU 里程碑活動、產業主題演講、青年孵化。',
                        img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                        date: '10/25',
                        title: '論壇 + 模聯日',
                        desc: '高層全體會議、論壇分場、委員會辯論、晚宴。',
                        img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop'
                    },
                    {
                        date: '10/26',
                        title: '委員會 & 參訪',
                        desc: '決議辯論、文化研學、參訪 UNU、閉幕典禮。',
                        img: 'https://images.unsplash.com/photo-1518600506278-4e8ef466b810?q=80&w=1600&auto=format&fit=crop'
                    }
                ]
            },
            venues: { title: '活動場地' },
            speakers: {
                title: '重點講者',
                items: [
                    {
                        name: 'Prof. Tshilidzi Marwala',
                        role: '聯合國大學校長',
                        img: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=800&auto=format&fit=crop'
                    },
                    {
                        name: 'UNESCO AI 講席',
                        role: '專屬工作坊帶領',
                        img: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=800&auto=format&fit=crop'
                    },
                    {
                        name: 'Microsoft AI for Good',
                        role: '產業主題演講',
                        img: 'https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=800&auto=format&fit=crop'
                    },
                    {
                        name: 'NVIDIA AI Tech Centre',
                        role: '產業分享',
                        img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop'
                    }
                ]
            },
            packages: {
                title: '方案速覽',
                educators: {
                    title: '教育者（SEF）',
                    items: [
                        'A 方案：General Pass（論壇 + 午宴）',
                        'B 方案：Full Pass（含 10/26 教育參訪）',
                        '加購：UNESCO AI 講席工作坊（按需）'
                    ]
                },
                students: {
                    title: '學生（AIMUN & UN 體驗日）',
                    items: [
                        'UN Experience Day — Full Pass',
                        'MUN — General Pass / Full Pass',
                        '加購：住宿方案、2 週領袖營（10/6–17）'
                    ]
                }
            },
            organizers: { title: '主辦與夥伴' }
        },
        about: {
            title: '活動介紹',
            lead: '為校長、教育者與 10–25 歲學生而設。與聯合國大學駐澳門研究所及夥伴，深入 AI 教育、外交與全球治理。',
            tabs: { sef: 'SEF 論壇', aimun: 'AIMUN 大會', un: 'UN 體驗日' },
            sef: {
                title: '智慧教育論壇（SEF）— 校長與教育者',
                points: [
                    'UNU 校長主題演講',
                    'UNESCO AI 講席專屬工作坊',
                    'AI 示範課堂與學校創新案例',
                    '香港大學升學分享（HKU）',
                    'UNU 認證證書'
                ],
                infoTitle: '詳細資訊',
                info: ['日期：2025/10/25', '地點：永利皇宮', '對象：校長與教育者']
            },
            aimun: {
                title: 'AIMUN 模擬聯合國大會 — 小四至大學',
                points: [
                    '全球首個 AI 結合模聯，與聯合國大學緊密合作',
                    '委員會：ILO、WTO、GA1、UNEP、WHO',
                    '優秀決議提交至聯合國秘書長辦公室',
                    '資深顧問與聯合國官員指導'
                ],
                infoTitle: '詳細資訊',
                info: ['日期：2025/10/25–26', '地點：UNU Macau / 永利皇宮', '語言：英 / 中']
            },
            un: {
                title: '聯合國體驗日 — 10–25 歲學生',
                points: [
                    'SDG 實作工作坊與文化探索',
                    '與聯合國官員及產業領袖交流',
                    'AI 倫理與全球治理主題',
                    'UNU 認可實踐證書'
                ],
                infoTitle: '詳細資訊',
                info: ['日期：2025/10/25–26', '地點：UNU Macau 及澳門多地', '對象：10–25 歲']
            }
        },
        highlights: {
            lead: '結合高層論壇、實作模擬與文化體驗的一站式活動。',
            cards: [
                {
                    t: '跨域論壇',
                    d: '以 AI + 教育為核心，兼顧政策與實作。',
                    img: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1600&auto=format&fit=crop'
                },
                {
                    t: '重量級講者',
                    d: 'UNU 校長、UNESCO AI 講席、Microsoft AI for Good、NVIDIA 等。',
                    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop'
                },
                {
                    t: '認證與機會',
                    d: 'UNU/UNESCO 證書、專案孵化與青年創新網絡。',
                    img: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?q=80&w=1600&auto=format&fit=crop'
                }
            ]
        },
        register: {
            lead: '選擇合適方案並完成報名。早鳥截止：2025/09/25。',
            btnIndividual: '個人報名',
            btnGroup: '團體 / 學校',
            educators: {
                title: '教育者（SEF）',
                items: [
                    'A 方案：General Pass（論壇 + 午宴）',
                    'B 方案：Full Pass（含 10/26 教育參訪）',
                    '加購：UNESCO AI 講席專屬工作坊（按需）'
                ]
            },
            students: {
                title: '學生（AIMUN & UN 體驗日）',
                items: [
                    'UN Experience Day — Full Pass',
                    'MUN — General Pass / Full Pass',
                    '加購：住宿方案、2 週 Leadership Camp（10/6–17 線上夜間）'
                ]
            },
            addons: {
                title: '加購項目',
                items: ['住宿 + 交通接駁', 'AIMUN 領袖營（線上夜間，10/6–17）']
            }
        }
    }
};
