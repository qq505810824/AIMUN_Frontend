'use client';
import { useLang } from '@/context/lang-context';
import { NewsModel } from '@/models/NewsModel';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

export default function News() {
    const { L } = useLang();

    const [items, setItems] = useState<NewsModel[] | null>(null);

    const [filters, setFilters] = useState<any>({
        order: 'updated_at'
    });

    // const { data, isLoading, isError, mutate } = useNewsData({ ...filters });

    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const { data, error, isLoading } = useSWR(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tables/${process.env.NEXT_PUBLIC_TABLE_NEWS_ID}/list_records`,
        fetcher
    );

    useEffect(() => {
        if (data) {
            console.log('data:', data);
            const allPosts = data?.records || [];
            setItems(allPosts);
        }
    }, [data]);

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
        // setItems(mock);
        return () => {
            mounted = false;
        };
    }, [mock]);

    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold">{L('News', '最新消息')}</h2>
                {/* <p className="mt-2 text-slate-600 max-w-3xl">{T.about.lead}</p>  */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {(items || []).map((n) => (
                    <article key={n.id} className="rounded-xl border overflow-hidden flex flex-col">
                        {n.cover ? (
                            <img
                                src={n.cover}
                                alt={L(n.title, n.title_zh).toString()}
                                className="w-full h-60 object-cover"
                            />
                        ) : (
                            <div className="w-full h-60 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                                <span className="h-60 text-slate-500 text-sm">{L(' ', ' ')}</span>
                            </div>
                        )}
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="text-xs text-slate-500 mb-1">
                                {moment(n.updated_at).format('YYYY-MM-DD')}
                            </div>
                            <h3 className="font-semibold mb-2 line-clamp-2">
                                {L(n.title, n.title_zh)}
                            </h3>
                            {(n.description || n.description_zh) && (
                                <p className="text-sm text-slate-700 line-clamp-3">
                                    {L(
                                        (n.description && n.description.replace(/<[^>]*>/g, '')) ||
                                        '',
                                        (n.description_zh &&
                                            n.description_zh.replace(/<[^>]*>/g, '')) ||
                                        ''
                                    )}
                                </p>
                            )}
                            {/* <PostBody content={L(n.description || '', n.description_zh || '')} /> */}
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
