import SwrInitor from '@/app/components/swr-initor';
import { AlertProvider } from '@/context/AlertContext';
import { LoadProvider } from '@/context/LoadContext';
import { AppContextProvider } from '@/context/app-context';
import { EventEmitterContextProvider } from '@/context/event-emitter';
import { ModalContextProvider } from '@/context/modal-context';
import type { ReactNode } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Navigation';
import '../globals.css';

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <SwrInitor>
                <AppContextProvider>
                    <EventEmitterContextProvider>
                        <AlertProvider>
                            <LoadProvider>
                                <ModalContextProvider>
                                    {/* <HeaderView /> */}
                                    <Nav />
                                    <div className="flex flex-col   items-center w-full  ">
                                        <div
                                            className="max-w-7xl  from-white to-gray-50 text-gray-900"
                                        >
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

export const metadata = {
    title: "AI English — Learn Better with AI",
    description:
        "A next-generation platform for English writing, reading and speaking, powered by cutting-edge AI.",
};

export default Layout;
