'use client';
import News from '@/app/(commonLayout)/news/page';
import About from '@/app/components/about';
import { Contact } from '@/app/components/contact';
import { Footer } from '@/app/components/Footer';
import { HeaderView } from '@/app/components/Header';
import { Hero } from '@/app/components/Hero';
import { Highlights } from '@/app/components/highlights';
import EventCard from '@/app/components/home/EventCard';
import VenueCard from '@/app/components/home/VenueCard';
import { Register } from '@/app/components/register';
import { useLang } from '@/context/lang-context';
import { useEffect, useMemo, useState } from 'react';

export default function App() {
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

            if (
                isMenuOpen &&
                menu &&
                button &&
                !menu.contains(e.target as Node) &&
                !button.contains(e.target as Node)
            ) {
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

            <HeaderView T={T} section={tab} setSection={setTab} />

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
            {tab === 'highlights' && <Highlights lang={lang} T={T} />}
            {tab === 'register' && <Register lang={lang} T={T} />}
            {tab === 'contact' && <Contact lang={lang} T={T} />}
            {tab === 'news' && <News />}

            <Footer />
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
            <Hero T={T} goRegister={goRegister} goAbout={goAbout} setAboutTab={setAboutTab} />

            {/* THREE EVENTS (pretty cards with photos) */}
            <section className="mx-auto max-w-7xl px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-extrabold">
                    {T.homeSections.events.title}
                </h2>
                <p className="mt-2 text-slate-600">{T.homeSections.events.lead}</p>
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
                <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {T.homeSections.speakers.items.map((s: any, i: number) => (
                        <div
                            key={i}
                            className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden"
                        >
                            <img src={s.img} alt={s.name} className="h-52 w-full object-cover" />
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

// ------------------ COPY: Translations ------------------

export type LangKey = 'en' | 'zh';

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
                lead: 'Three signature events designed for both educators and students, provides access to latest development in AI and technology. ',
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
            venues: { title: 'Venues' },
            speakers: {
                title: 'Featured Speakers',
                items: [
                    {
                        name: 'Prof. Tshilidzi Marwala',
                        role: 'Rector, United Nations University',
                        img: './speakers/Marwala.jpg'
                    },
                    {
                        name: 'Prof. John Shawe-Taylor',
                        role: 'UNESCO Chair in AI',
                        img: './speakers/John.jpg'
                    },
                    {
                        name: 'Prof.CHAN, Cecilia K. Y.',
                        role: 'Professor, Faculty of Education, HKU',
                        img: './speakers/Cecilia.png'
                    }
                ]
            },

            organizers: { title: 'Organizers & Partners' }
        },
        about: {
            title: 'About the Events',
            lead: 'Designed for principals, educators, and students (ages 10–25). Explore AI in education, diplomacy, and global governance with UNU Macau and partners.',
            tabs: {
                sef: 'Smart Education Forum',
                aimun: 'Asia-Pacific International MUN Conference',
                un: 'UN Experience Day'
            },
            sef: {
                title: 'Smart Education Forum (SEF) — For Principals & Educators',
                description: 'The 2025 Smart Education Forum is dedicated to the theme of “Human-AI Co-creation and Linguistic Intelligence,” with a strong emphasis on redefining how AI can serve as a lifelong learning partner, empowering, rather than overshadowing, human growth. ',
                points_title: 'Event Highlights',
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
                description: 'The 2025 Asia-Pacific international Model United Nations (AIMUN) Conference, held October 25-26 in Macau in partnership with UNU Macau. It is the first ever AI-integrated MUN.  The conference features high-level speakers from the UN and a UNU-certified credential to outstanding performers.',
                points_title: 'Event Highlights',
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
                description: 'The UN Experience day is an exclusive event for students aiming to provide them with global exposure and key insights from industry leaders. The event features a range of activities including, NVIDIA hands-on workshop, private meeting with UNESCO,  project incubations and UN-certified certificates',
                points_title: 'Event Highlights',
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
                    img: './event/e_1.jpg'
                },
                {
                    t: 'Top Speakers',
                    d: 'UNU Rector, UNESCO Chair in AI, Microsoft AI for Good, NVIDIA AI Technology Centre.',
                    img: './event/e_2.jpg'
                },
                {
                    t: 'Practice & Recognition',
                    d: 'UNU/UNESCO certificates, project incubation, and youth innovation network.',
                    img: './event/e_3.jpg'
                }
            ]
        },
        register: {
            lead: 'Choose your path and secure your spot. Early-bird deadline: Sep 25, 2025.',
            btnIndividual: 'Individual',
            btnGroup: 'Group / School',
            viewDetail: 'View detailed packages',
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
            about: '關於我們',
            highlights: '活動亮點',
            news: '最新消息', // placehold
            register: '立即報名',
            contact: '聯絡我們'
        },
        hero: {
            title: '2025 智慧教育論壇 ·亞太區國際模擬聯合國大會· 聯合國體驗日',
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
            venues: { title: '活動場地' },
            speakers: {
                title: '重點講者',
                items: [
                    {
                        name: 'Prof. Tshilidzi Marwala',
                        role: 'Rector, United Nations University',
                        img: './speakers/Marwala.jpg'
                    },
                    {
                        name: 'Prof. John Shawe-Taylor',
                        role: 'UNESCO Chair in AI',
                        img: './speakers/John.jpg'
                    },
                    {
                        name: 'Prof.CHAN, Cecilia K. Y.',
                        role: 'Professor, Faculty of Education, HKU',
                        img: './speakers/Cecilia.png'
                    }
                ]
            },
            organizers: { title: '主辦與夥伴' }
        },
        about: {
            title: '活動介紹',
            lead: '為校長、教育者與 10–25 歲學生而設。與聯合國大學駐澳門研究所及夥伴，深入 AI 教育、外交與全球治理。',
            tabs: { sef: '智慧教育論壇', aimun: '亞太區國際模擬聯合國大會', un: '聯合國體驗日' },
            sef: {
                title: '智慧教育論壇（SEF）— 校長與教育者',
                description: '2025智慧教育論壇以「人機共創與語言智能」為核心議題，致力重新定義人工智慧如何成為終身學習夥伴——賦能人類成長，而非取代人類發展。',
                points_title: '活動亮點',
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
                description: '2025年亞太國際模擬聯合國大會（AIMUN）於10月25日至26日在澳門舉行，我們與聯合國大學澳門分校協辦。本次會議創下全球首例導入人工智慧技術的模擬聯合國盛會，特邀聯合國高階官員擔任主講嘉賓，並將頒發聯合國大學認證的卓越表現證書予傑出與會者。',
                points_title: '活動亮點',
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
                description: '聯合國體驗日是專為學生打造的獨家活動，旨在提供全球視野並獲取業界領袖的關鍵洞見。活動包含多項特色環節：NVIDIA實作工作坊、聯合國教科文組織專屬會談、專案孵化計畫，以及聯合國認證證書頒發。',
                points_title: '活動亮點',
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
                    img: './event/e_1.jpg'
                },
                {
                    t: '重量級講者',
                    d: 'UNU 校長、UNESCO AI 講席、Microsoft AI for Good、NVIDIA 等。',
                    img: './event/e_2.jpg'
                },
                {
                    t: '認證與機會',
                    d: 'UNU/UNESCO 證書、專案孵化與青年創新網絡。',
                    img: './event/e_3.jpg'
                }
            ]
        },
        register: {
            lead: '選擇合適方案並完成報名。早鳥截止：2025/09/25。',
            btnIndividual: '個人報名',
            btnGroup: '團體 / 學校',
            viewDetail: '查看參會方案',
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
