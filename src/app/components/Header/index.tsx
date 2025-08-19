'use client';
import { useAppContext } from '@/context/app-context';
import { GlobalStyles, Sheet } from '@mui/joy';
import { Globe2 } from 'lucide-react';
import { useRouter } from 'next-nprogress-bar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface ViewProps {
    title: string;
    section: string;
    setSection: any;
    links: any[];
}

export default function HeaderView(props: ViewProps) {
    const { title, section, setSection, links } = props;

    const [isMenuOpen, setIsMenuOpen] = useState(false); // 移動端選單狀態
    const pathname = usePathname(); // 獲取當前路徑

    const [selectedCommunity, setSelectedCommunity] = useState<any>(null);
    const [showCommunityDropdown, setShowCommunityDropdown] = useState(false);
    const [currentView, setCurrentView] = useState('dashboard');
    const { userProfile } = useAppContext();

    const router = useRouter();

    const showSection = (section: string) => {
        setSection(section);
        router.push(section);
    };

    const logout = async () => {

    };

    return (
        <>
            <Sheet
                sx={{
                    display: { xs: 'flex', md: 'flex' },
                    alignItems: 'center',
                    justifyContent: { xs: 'space-between', md: 'flex-end' },
                    // position: 'fixed',
                    // top: 0,
                    // width: '100vw',
                    height: 'var(--Header-height)',
                    zIndex: 9995,
                    p: 4,
                    gap: 1,
                    borderBottom: '1px solid',
                    borderColor: 'background.level1',
                    boxShadow: 'sm'
                }}
            >
                <GlobalStyles
                    styles={(theme) => ({
                        ':root': {
                            '--Header-height': '52px',
                            [theme.breakpoints.up('md')]: {
                                '--Header-height': 'auto'
                            }
                        }
                    })}
                />

                <header
                    className={`fixed top-0 left-0 right-0 z-50   backdrop-blur transition-all duration-300 bg-white/80 border-b border-gray-100 px-4 md:px-4 py-4`}
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center space-x-2 md:space-x-4">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="md:hidden flex items-center p-2 rounded-md text-gold-400 hover:text-gold-500 transition-colors focus:outline-none"
                                aria-expanded={isMenuOpen}
                                aria-label="打開選單"
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    {isMenuOpen ? (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    ) : (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    )}
                                </svg>
                            </button>
                            <Link href="/" className="flex items-center gap-2">
                                <Globe2 className="h-6 w-6 text-blue-600" />
                                <span className="font-bold">{title}</span>
                            </Link>

                        </div>
                        <nav className="hidden md:flex items-center gap-1 text-sm">
                            {links.map((link) => {
                                return (
                                    <Link className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-gray-100" href={link.href}>{link.label}</Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* 移動端下拉選單 */}
                    <div
                        className={`flex md:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                        <div className="w-full flex flex-col px-4 pt-4 pb-3 space-y-1 shadow-inner">
                            {links.map((link) => {
                                // const isActive = section == link.href;
                                let isActive =
                                    pathname === link.href ||
                                    (pathname.startsWith(link.href) && link.href !== '/');

                                // console.log('pathname', pathname);

                                if (
                                    (pathname == '/home' || pathname == '/') &&
                                    link.href == '/'
                                ) {
                                    isActive = true;
                                }

                                return (
                                    <div
                                        key={link.href}
                                        // href={link.href}
                                        className={`w-full block px-3 py-2 rounded-md text-base font-medium transition-colors 
                              ${isActive ? 'text-white bg-blue-500' : ''} `}
                                        onClick={() => {
                                            showSection(link.href);
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        {link.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </header>
            </Sheet>
        </>
    );
}
