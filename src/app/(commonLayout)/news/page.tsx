'use client';
import { Card, Section } from '@/app/components/common/Views/Blocks';
import { useLang } from '@/context/lang-context';
import { useEffect, useMemo, useState } from 'react';

// 定义新闻项的类型
interface NewsItem {
    id: string;
    date: string;
    titleEN: string;
    titleZH: string;
    bodyEN?: string;
    bodyZH?: string;
    image?: string;
}

export default function News() {
    const { L } = useLang();
    const [items, setItems] = useState<NewsItem[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const mock = useMemo<NewsItem[]>(
        () => [
            {
                id: '1',
                date: '2025-09-08',
                titleEN: 'Conference Information Released',
                titleZH: '會議資訊發布',
                image: 'https://source.unsplash.com/featured/640x360/?announcement',
                bodyEN: 'Key dates and venues confirmed.',
                bodyZH: '關鍵日期與場地已確定。'
            },
            {
                id: '2',
                date: '2025-09-15',
                titleEN: 'Committee Guides Coming Soon',
                titleZH: '委員會指南即將發布',
                bodyEN: 'Guides will be released in phases.',
                bodyZH: '指南將分階段釋出。'
            },
            {
                id: '3',
                date: '2025-09-22',
                titleEN: 'Highlight: AI Education Day',
                titleZH: '亮點：AI 教育日',
                image: 'https://source.unsplash.com/featured/640x360/?ai,education'
            }
        ],
        []
    );

    useEffect(() => {
        let mounted = true;

        setItems(mock);

        // fetch('/api/news')
        //     .then((r) => {
        //         if (!r.ok) throw new Error('Failed to load /api/news')
        //         return r.json()
        //     })
        //     .then((data) => mounted && setItems(Array.isArray(data) ? data : mock))
        //     .catch(() => mounted && (setItems(mock), setError('offline')))
        return () => {
            mounted = false;
        };
    }, [mock]);

    return (
        <Section>
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{L('Latest News', '最新消息')}</h2>
                    {error === 'offline' && (
                        <span className="text-xs text-amber-600">
                            {L(
                                'Previewing mock data — add app/api/news/route.js to use your API.',
                                '目前顯示範例數據 — 新增 app/api/news/route.js 以使用你的 API。'
                            )}
                        </span>
                    )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    {(items || []).map((n) => (
                        <article
                            key={n.id}
                            className="rounded-xl border overflow-hidden flex flex-col"
                        >
                            {n.image ? (
                                <img
                                    src={n.image}
                                    alt={L(n.titleEN, n.titleZH).toString()}
                                    className="w-full h-36 object-cover"
                                />
                            ) : (
                                <div className="w-full h-36 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                                    <span className="text-slate-500 text-sm">
                                        {L('Text Update', '文字更新')}
                                    </span>
                                </div>
                            )}
                            <div className="p-4 flex-1 flex flex-col">
                                <div className="text-xs text-slate-500 mb-1">{n.date}</div>
                                <h3 className="font-semibold mb-2">{L(n.titleEN, n.titleZH)}</h3>
                                {(n.bodyEN || n.bodyZH) && (
                                    <p className="text-sm text-slate-700 line-clamp-3">
                                        {L(n.bodyEN || '', n.bodyZH || '')}
                                    </p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </Card>
        </Section>
    );
}
