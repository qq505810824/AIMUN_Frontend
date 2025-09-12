'use client';
import { LangKey } from '@/app/(commonLayout)/home/page';
import { useLang } from '@/context/lang-context';
import { useRouter } from 'next-nprogress-bar';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    T: any;
    section: string;
    setSection: any;
}

export function HeaderView(props: ViewProps) {
    const { T, section, setSection, } = props;

    const { lang, setLang } = useLang();

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 移動端選單狀態
    const pathname = usePathname(); // 獲取當前路徑

    const router = useRouter();

    const showSection = (section: string) => {
        setSection(section);
        router.push(section);
    };

    const logout = async () => { };

    return (
        <>
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
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
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
                                            setSection(item.id);
                                            setIsMenuOpen(false); // 关闭移动端菜单
                                        }}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 ${section === item.id ? 'bg-slate-900 text-white hover:bg-slate-900' : ''}`}
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
                                                    setSection(item.id);
                                                    setIsMenuOpen(false); // 点击后关闭菜单
                                                }}
                                                className={`w-full text-left px-4 py-3 text-sm font-medium hover:bg-slate-100 ${section === item.id ? 'bg-slate-900 text-white hover:bg-slate-900' : ''}`}
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
                                setSection('register');
                                setIsMenuOpen(false); // 关闭移动端菜单
                            }}
                            className="ml-3 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm text-white hover:bg-blue-700 shadow"
                        >
                            {T.ctaRegister}
                        </a>
                    </div>
                </nav>
            </header>
        </>
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
