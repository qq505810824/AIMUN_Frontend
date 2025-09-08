'use client';
import { Card, Section } from '@/app/components/common/Views/Blocks';
import { useLang } from '@/context/lang-context';

export default function Contact() {
    const { L } = useLang();
    return (
        <Section>
            <Card>
                <h2 className="text-2xl font-bold mb-3">{L('Contact Us', '聯絡我們')}</h2>
                <ul className="text-slate-700 space-y-2">
                    <li>
                        Email:{' '}
                        <a className="underline" href="mailto:aimun@moimun.org">
                            aimun@moimun.org
                        </a>
                    </li>
                    <li>WhatsApp: +852 44106234</li>
                    <li>Phone: +853 66870988</li>
                </ul>
            </Card>
        </Section>
    );
}
