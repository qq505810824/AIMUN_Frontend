'use client';
import { useLang } from '@/context/lang-context';
import { NewsModel } from '@/models/NewsModel';
import moment from 'moment';
import { useEffect, useState } from 'react';
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
            const allPosts = data?.records || [];
            setItems(allPosts);
        }
    }, [data]);

    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <div className="flex flex-col mb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold">{L('News', '最新消息')}</h2>
                <p className="mt-2 text-slate-600">{L('Check out the latest news about global issues and technology.', '查閲關於全球資訊和科技發展的最新新聞')}</p>
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
