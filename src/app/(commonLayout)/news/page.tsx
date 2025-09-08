'use client';
import { Card, Section } from '@/app/components/common/Views/Blocks';
import { useLang } from '@/context/lang-context';
import { useNewsData } from '@/hooks/useNewsData';
import { NewsModel } from '@/models/NewsModel';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';

export default function News() {
    const { L } = useLang();
    const [items, setItems] = useState<NewsModel[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState<any>({
        order: 'updated_at'
    });

    const { data, isLoading, isError, mutate } = useNewsData({ ...filters });

    const mock = useMemo<NewsModel[]>(
        () => [
            {
                id: 1,
                updated_at: '2025-09-08',
                title: 'Conference Information Released',
                title_zh: '會議資訊發布',
                cover: 'https://source.unsplash.com/featured/640x360/?announcement',
                description: 'Key dates and venues confirmed.',
                description_zh: '關鍵日期與場地已確定。'
            },
            {
                id: 2,
                updated_at: '2025-09-15',
                title: 'Committee Guides Coming Soon',
                title_zh: '委員會指南即將發布',
                cover: 'https://source.unsplash.com/featured/640x360/?announcement',
                description: 'Guides will be released in phases.',
                description_zh: '指南將分階段釋出。'
            },
            {
                id: 3,
                updated_at: '2025-09-22',
                title: 'Highlight: AI Education Day',
                title_zh: '亮點：AI 教育日',
                cover: 'https://source.unsplash.com/featured/640x360/?ai,education',
                description: 'Highlight.',
                description_zh: 'Highlight'
            }
        ],
        []
    );

    useEffect(() => {
        let mounted = true;
        setItems(mock);
        return () => {
            mounted = false;
        };
    }, [mock]);

    return (
        <Section>
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold">{L('Latest News', '最新消息')}</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(items || []).map((n) => (
                        <article
                            key={n.id}
                            className="rounded-xl border overflow-hidden flex flex-col"
                        >
                            {n.cover ? (
                                <img
                                    src={n.cover}
                                    alt={L(n.title, n.title_zh).toString()}
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
                                <div className="text-xs text-slate-500 mb-1">
                                    {moment(n.updated_at).format('YYYY-MM-DD HH:mm')}
                                </div>
                                <h3 className="font-semibold mb-2">{L(n.title, n.title_zh)}</h3>
                                {(n.description || n.description_zh) && (
                                    <p className="text-sm text-slate-700 line-clamp-3">
                                        {L(n.description || '', n.description_zh || '')}
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
