'use client';

import Home from './(commonLayout)/home/page';
import Footer from './components/Footer';
import HeaderSet from './components/Header/HeaderSet';
import { Hero } from './components/Hero';

const Page = () => {
    return (
        <div className="flex flex-col ">
            <HeaderSet />
            <Hero />
            <div className="flex flex-col   items-center w-full  ">
                <div className="max-w-7xl  from-white to-gray-50 text-gray-900">
                    <Home />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Page;
