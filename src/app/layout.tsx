import Topbar from '@/app/components/base/topbar';
import { AppContextProvider } from '@/context/app-context';
import { LangProvider } from '@/context/lang-context';
import { LoadProvider } from '@/context/LoadContext';
import { ModalContextProvider } from '@/context/modal-context';
import type { Viewport } from 'next';
import React from 'react';
import SwrInitor from './components/swr-initor';
import './styles/globals.css';
import './styles/markdown.scss';

export const metadata = {
    title: 'AIMUN',
    description: 'AIMUN'
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    viewportFit: 'cover',
    userScalable: false
};

const LocaleLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html className="h-full">
            <head>
                <meta name="theme-color" content="#FFFFFF" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            </head>
            <body className="h-full select-auto">
                <Topbar />
                <SwrInitor>
                    <LangProvider>
                        <AppContextProvider>
                            <LoadProvider>
                                <ModalContextProvider>
                                    {children}
                                </ModalContextProvider>
                            </LoadProvider>
                        </AppContextProvider>
                    </LangProvider>
                </SwrInitor>
            </body>
        </html>
    );
};
export default LocaleLayout;
