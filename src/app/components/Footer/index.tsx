import { useLang } from '@/context/lang-context';

export const Footer = () => {
    const { L } = useLang();
    return (
        <footer className="mt-16 border-t border-slate-200">
            <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500 flex flex-col md:flex-row items-center md:justify-between gap-4">
                <p>
                    © 2025 AIMUN ·{' '}
                    {L(
                        'Macau International Model United Nations Youth Association',
                        '澳門國際模擬聯合國青年協會'
                    )}
                </p>
                <p className="opacity-75">Wynn Palace • UNU Macau</p>
            </div>
        </footer>
    );
};
