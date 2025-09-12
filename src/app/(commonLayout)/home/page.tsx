'use client';
import News from '@/app/(commonLayout)/news/page';
import { useLang } from '@/context/lang-context';
import { Mail } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export default function App() {
    // const [lang, setLang] = useState<LangKey>('en');
    const [tab, setTab] = useState('home');
    const [aboutTab, setAboutTab] = useState('sef');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // 添加移动端菜单状态

    const { lang, setLang } = useLang();
    // 现在 lang 已经是正确的 LangKey 类型，无需类型断言

    const T = useMemo(() => translations[lang], [lang]);

    // 点击页面其他地方时关闭菜单
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const menu = document.getElementById('mobile-menu');
            const button = document.getElementById('menu-button');

            if (isMenuOpen && menu && button &&
                !menu.contains(e.target as Node) &&
                !button.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
                <nav className="mx-auto max-w-7xl px-4 py-3 flex justify-between">
                    <div className="flex flex-row items-center">
                        {/* 移动端菜单按钮 */}
                        <button
                            id="menu-button"
                            onClick={(e) => {
                                e.stopPropagation(); // 阻止事件冒泡
                                setIsMenuOpen(!isMenuOpen);
                            }}
                            className="md:hidden mr-4 p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none"
                            aria-label="Toggle menu"
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                        {/* 桌面端导航列表 - 在移动端隐藏 */}
                        <ul className="hidden md:flex flex-wrap gap-2">
                            {[
                                { id: 'home', label: T.nav.home },
                                { id: 'about', label: T.nav.about },
                                { id: 'highlights', label: T.nav.highlights },
                                { id: 'news', label: T.nav.news },
                                { id: 'register', label: T.nav.register },
                                { id: 'contact', label: T.nav.contact }
                            ].map((item) => (
                                <li key={item.id}>
                                    <button
                                        onClick={() => {
                                            setTab(item.id);
                                            setIsMenuOpen(false); // 关闭移动端菜单
                                        }}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 ${tab === item.id ? 'bg-slate-900 text-white hover:bg-slate-900' : ''}`}
                                    >
                                        {item.label}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* 移动端导航列表 - 在桌面端隐藏 */}
                        {isMenuOpen && (
                            <div
                                id="mobile-menu"
                                className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg z-50"
                            >
                                <ul className="flex flex-col py-2">
                                    {[
                                        { id: 'home', label: T.nav.home },
                                        { id: 'about', label: T.nav.about },
                                        { id: 'highlights', label: T.nav.highlights },
                                        { id: 'news', label: T.nav.news },
                                        { id: 'register', label: T.nav.register },
                                        { id: 'contact', label: T.nav.contact }
                                    ].map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => {
                                                    setTab(item.id);
                                                    setIsMenuOpen(false); // 点击后关闭菜单
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-100 ${tab === item.id ? 'bg-slate-900 text-white hover:bg-slate-900' : ''}`}
                                            >
                                                {item.label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <LangSwitcher lang={lang} setLang={setLang} />
                        <a
                            href="#register"
                            onClick={(e) => {
                                e.preventDefault();
                                setTab('register');
                                setIsMenuOpen(false); // 关闭移动端菜单
                            }}
                            className="ml-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-2 py-1 sm:px-3 sm:py-3 text-xs sm:text-sm text-white hover:bg-blue-700 shadow"
                        >
                            {T.ctaRegister}
                        </a>
                    </div>
                </nav>
            </header>

            {tab === 'home' && (
                <Home
                    lang={lang}
                    T={T}
                    goRegister={() => {
                        setTab('register');
                        setIsMenuOpen(false);
                    }}
                    goAbout={() => {
                        setTab('about');
                        setIsMenuOpen(false);
                    }}
                    setAboutTab={setAboutTab}
                />
            )}
            {tab === 'about' && (
                <About lang={lang} T={T} aboutTab={aboutTab} setAboutTab={setAboutTab} />
            )}
            {tab === 'highlights' && <Highlights T={T} />}
            {tab === 'register' && <Register T={T} />}
            {tab === 'contact' && <Contact T={T} />}
            {tab === 'news' && <News />}

            <footer className="mt-16 border-t border-slate-200">
                <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500 flex flex-col md:flex-row items-center md:justify-between gap-4">
                    <p>
                        © 2025 AIMUN · Macau International Model United Nations Youth Association
                    </p>
                    <p className="opacity-75">Wynn Palace • UNU Macau</p>
                </div>
            </footer>
        </div>
    );
}

function LangSwitcher({ lang, setLang }: { lang: LangKey; setLang: (l: LangKey) => void }) {
    return (
        <div className="inline-flex rounded-xl border border-slate-300 bg-white overflow-hidden">
            {['en', 'zh'].map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l as LangKey)}
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
                    src="./archive/59831757665060_.pic_hd.jpg"
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

            {/* THREE EVENTS (pretty cards with photos) */}
            <section className="mx-auto max-w-7xl px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-extrabold">
                    {T.homeSections.events.title}
                </h2>
                <p className="mt-2 text-slate-600 max-w-3xl">{T.homeSections.events.lead}</p>
                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <EventCard
                        img="./archive/59851757665119_.pic_hd.jpg"
                        tag={T.about.tabs.sef}
                        title={T.homeSections.events.cards[0].t}
                        desc={T.homeSections.events.cards[0].d}
                        onClick={() => {
                            goAbout();
                            setAboutTab('sef');
                        }}
                    />
                    <EventCard
                        img="./archive/model_un_landing_page.jpg"
                        tag={T.about.tabs.aimun}
                        title={T.homeSections.events.cards[1].t}
                        desc={T.homeSections.events.cards[1].d}
                        onClick={() => {
                            goAbout();
                            setAboutTab('aimun');
                        }}
                    />
                    <EventCard
                        img="./archive/UN-75-tile700x400.jpg"
                        tag={T.about.tabs.un}
                        title={T.homeSections.events.cards[2].t}
                        desc={T.homeSections.events.cards[2].d}
                        onClick={() => {
                            goAbout();
                            setAboutTab('un');
                        }}
                    />
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
                        img="./archive/UNU_Macau.jpg"
                    />
                    <VenueCard
                        title="Wynn Palace"
                        subtitle={lang === 'en' ? 'Grand Theatre • Cotai' : '永利皇宮（路氹城）'}
                        img="./archive/Wynn_Palace_Macau.png"
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

            {/* ORGANIZERS */}
            <section className="mx-auto max-w-7xl px-4 pb-16">
                <h3 className="text-xl font-bold">{T.homeSections.organizers.title}</h3>
                <div className="mt-4 flex flex-wrap items-center gap-6 opacity-80">
                    <img src="./logo/1.jpg" className="h-20 rounded" alt="" />
                    <img src="./logo/2.jpg" className="h-20 rounded" alt="" />
                    <img src="./logo/3.jpg" className="h-20 rounded" alt="" />
                    <img src="./logo/4.jpg" className="h-20 rounded" alt="" />
                    <img src="./logo/5.jpg" className="h-20 rounded" alt="" />
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
                            img="./archive/59851757665119_.pic_hd.jpg"
                            title={T.about.sef.title}
                            bullets={T.about.sef.points}
                            tag={T.about.tabs.sef}
                        />
                        <AboutInfo title={T.about.sef.infoTitle} lines={T.about.sef.info} />
                    </>
                )}
                {aboutTab === 'aimun' && (
                    <>
                        <AboutCard
                            img="./archive/model_un_landing_page.jpg"
                            title={T.about.aimun.title}
                            bullets={T.about.aimun.points}
                            tag={T.about.tabs.aimun}
                        />
                        <AboutInfo title={T.about.aimun.infoTitle} lines={T.about.aimun.info} />
                    </>
                )}
                {aboutTab === 'un' && (
                    <>
                        <AboutCard
                            img="./archive/UN-75-tile700x400.jpg"
                            title={T.about.un.title}
                            bullets={T.about.un.points}
                            tag={T.about.tabs.un}
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
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold">{T.nav.register}</h2>
                    <p className="mt-2 text-slate-600 max-w-3xl">{T.register.lead}</p>
                </div>
                <a
                    href="#"
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
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');

    async function onSubmit(e: any) {
        e.preventDefault();
        setLoading(true);
        setErr('');

        const form = new FormData(e.currentTarget);
        const payload = Object.fromEntries(form.entries());

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data?.error || 'Failed to send message.');
            }
            setSent(true);
            e.currentTarget.reset();
        } catch (error: any) {
            setErr(error.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    }

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
                <div className="overflow-hidden rounded-2xl bg-white border p-4 border-slate-200 shadow-sm">
                    <h1 className="text-2xl font-extrabold">Contact Us</h1>
                    <p className="mt-2 text-gray-700">
                        Tell us a bit about you and we’ll reach out to schedule a demo.
                    </p>
                    {!sent ? (
                        <form onSubmit={onSubmit} className="mt-8 grid gap-4 max-w-3xl">
                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    name="name"
                                    required
                                    placeholder="Full name"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Email"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <input
                                    name="organization"
                                    placeholder="Organization"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <input
                                    name="location"
                                    placeholder="Location"
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <input
                                name="whatsapp"
                                placeholder="WhatsApp (Optional)"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <textarea
                                name="message"
                                rows={6}
                                required
                                placeholder="What would you like to achieve with AI English?"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            ></textarea>

                            {err && (
                                <div className="p-3 text-sm rounded-xl border border-red-200 bg-red-50 text-red-700">
                                    {err}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center gap-2 justify-center px-6 py-3 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                <Mail className="h-4 w-4" />{' '}
                                {loading ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    ) : (
                        <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-xl max-w-3xl">
                            Thanks! Your message has been sent.
                        </div>
                    )}
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
            news: 'News',
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
            tabs: {
                sef: 'Smart Education Forum',
                aimun: 'UN Experience Day',
                un: 'Asia-Pacific International MUN Conference'
            },
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
            viewDetail: 'view detailed packages',
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
            about: '關於我们',
            highlights: '活動亮點',
            news: '最新消息', // placehold
            register: '立即報名',
            contact: '聯絡我们'
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
            tabs: { sef: '智慧教育論壇', aimun: '聯合國體驗日', un: '亞太區國際模擬聯合國大會' },
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
            viewDetail: 'view detailed packages',
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
