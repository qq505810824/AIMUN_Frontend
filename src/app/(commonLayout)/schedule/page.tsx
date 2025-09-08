'use client';
import { Card, Section } from '@/app/components/common/Views/Blocks';
import { useLang } from '@/context/lang-context';

export default function Schedule() {
    const { L } = useLang();
    return (
        <Section>
            <Card>
                <h2 className="text-2xl font-bold mb-2">{L('Program Snapshot', '活動快照')}</h2>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                    <li>
                        {L(
                            'Fri, Oct 24 — Optional: UNU Macau AI Education Day',
                            '10/24（五）— 可選：UNU Macau AI 教育日'
                        )}
                    </li>
                    <li>
                        {L(
                            'Sat, Oct 25 — Opening & Committee Sessions',
                            '10/25（六）— 開幕與委員會會議'
                        )}
                    </li>
                    <li>
                        {L(
                            'Sun, Oct 26 — Committee Sessions, Gala & Closing',
                            '10/26（日）— 委員會、晚宴與閉幕'
                        )}
                    </li>
                </ul>
            </Card>
        </Section>
    );
}
