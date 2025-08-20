'use client';
import SwrInitor from '@/app/components/swr-initor';
import { AlertProvider } from '@/context/AlertContext';
import { LoadProvider } from '@/context/LoadContext';
import { AppContextProvider } from '@/context/app-context';
import { EventEmitterContextProvider } from '@/context/event-emitter';
import { ModalContextProvider } from '@/context/modal-context';
import type { ReactNode } from 'react';
import React from 'react';
import Footer from '../components/Footer';
import HeaderView from '../components/Header';
import '../globals.css';

const Layout = ({ children }: { children: ReactNode }) => {
    const [section, setSection] = React.useState('dashboard');

    const links = [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Platform', href: '/platform' },
        // { label: 'Technology', href: '/technology' },
        // { label: 'Gallery', href: '/gallery' },
        { label: 'Contact', href: '/contact' }
    ];

    return (
        <>
            <SwrInitor>
                <AppContextProvider>
                    <EventEmitterContextProvider>
                        <AlertProvider>
                            <LoadProvider>
                                <ModalContextProvider>
                                    <HeaderView
                                        {...{
                                            title: 'AI English',
                                            links,
                                            section,
                                            setSection
                                        }}
                                    />
                                    <div className="flex flex-col   items-center w-full  ">
                                        <div className="max-w-7xl  from-white to-gray-50 text-gray-900">
                                            {children}
                                        </div>
                                    </div>
                                    <Footer />
                                    {/* <SimpleLayout {...{ children }} /> */}
                                    {/* { children } */}
                                </ModalContextProvider>
                            </LoadProvider>
                        </AlertProvider>
                    </EventEmitterContextProvider>
                </AppContextProvider>
            </SwrInitor>
        </>
    );
};

export default Layout;
