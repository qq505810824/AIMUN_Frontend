'use client';

import React from 'react';
import HeaderView from '.';

export default function HeaderSet() {
    const [section, setSection] = React.useState('dashboard');

    const links = [
        { id: 'home', labelEN: 'Home', labelZH: '首頁', href: '/' },
        { id: 'about', labelEN: 'About', labelZH: '關於', href: '/about' },
        { id: 'committees', labelEN: 'Committees', labelZH: '委員會', href: '/committees' },
        { id: 'schedule', labelEN: 'Schedule', labelZH: '日程', href: '/schedule' },
        { id: 'apply', labelEN: 'Apply', labelZH: '報名', href: '/apply' },
        { id: 'news', labelEN: 'News', labelZH: '消息', href: '/news' },
        { id: 'contact', labelEN: 'Contact', labelZH: '聯絡', href: '/contact' }
    ];
    return (
        <>
            <HeaderView
                {...{
                    title: 'AIMUN',
                    links,
                    section,
                    setSection
                }}
            />
        </>
    );
}
