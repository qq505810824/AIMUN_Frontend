'use client';

import Head from 'next/head';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState, useRef } from 'react';
import MenuButton from './MenuButton';
import { useAppContext } from '@/context/app-context';
import Image from 'next/image';

export default function HeaderView() {
    const [email, setEmail] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const { userProfile } = useAppContext();
    const [isImageLoading, setIsImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);
    const loadingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const headerNavs = useMemo(
        () => [
            { href: '/essay/grade', name: '/essay/grade', displayName: 'Join' },
            { href: '/essay/dashboard', name: '/essay/dashboard', displayName: 'Dashboard' }
        ],
        []
    );

    useEffect(() => {
        const email = localStorage.getItem('email');
        if (email) {
            setEmail(email);
        } else {
            setEmail('');
        }
    }, [router]);

    useEffect(() => {
        if (localStorage.getItem('token') == null || localStorage.getItem('token') === '')
            router.push('/login');
    }, []);

    // Set loading timeout to prevent infinite loading state
    useEffect(() => {
        if (isImageLoading && userProfile?.school?.logo_small_url) {
            loadingTimeoutRef.current = setTimeout(() => {
                setIsImageLoading(false);
                setImageError(true);
            }, 5000); // 5 seconds timeout for loading
        }

        return () => {
            if (loadingTimeoutRef.current) {
                clearTimeout(loadingTimeoutRef.current);
            }
        };
    }, [isImageLoading, userProfile?.school?.logo_small_url]);

    // Check if school logo exists
    const hasValidSchoolLogo =
        userProfile?.school && userProfile.school.logo_small_url && !imageError;

    return (
        <>
            <Head>
                <title>AI English</title>
                <meta name="description" content="AI English by AI" />
            </Head>
            <header className="sticky top-0 w-full z-50 bg-white shadow-sm">
                <div className="container mx-auto flex flex-row items-center justify-between px-4 md:px-8 max-w-7xl h-16">
                    <div className="flex items-center space-x-2">
                        {/* Show title first, then logo (if available) */}
                        <h1 className="text-lg md:text-2xl font-bold">
                            <Link href="/">AI English</Link>
                        </h1>

                        {hasValidSchoolLogo && (
                            <div className="relative w-8 h-8 ml-2">
                                {isImageLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-500"></div>
                                    </div>
                                )}
                                <img
                                    src={userProfile?.school?.logo_small_url || ''}
                                    alt={userProfile?.school?.name || 'School logo'}
                                    className={`w-full h-full object-contain rounded ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                                    onLoad={() => {
                                        setIsImageLoading(false);
                                        if (loadingTimeoutRef.current) {
                                            clearTimeout(loadingTimeoutRef.current);
                                        }
                                    }}
                                    onError={() => {
                                        setImageError(true);
                                        setIsImageLoading(false);
                                        if (loadingTimeoutRef.current) {
                                            clearTimeout(loadingTimeoutRef.current);
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-row items-center justify-center h-full">
                        {headerNavs.map((item, idx) => (
                            <div
                                key={idx}
                                className={`flex items-center h-full mt-1 mx-2 md:mx-4 py-4 lg:mx-6 text-sm md:text-base border-b-2 text-center ${
                                    pathname === item.name
                                        ? `border-b-violet-500 text-violet-900`
                                        : 'border-b-transparent text-gray-500'
                                }`}
                            >
                                <Link href={item.href}>{item.displayName}</Link>
                            </div>
                        ))}
                    </div>
                    {email ? (
                        <div className="flex justify-end items-center">
                            <MenuButton email={email} />
                        </div>
                    ) : (
                        <div className="flex flex-row gap-8 items-center justify-end">
                            <Link href="/login/exist" className="text-purple-900 hover:underline">
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}
