'use client';
import { useLang } from '@/context/lang-context';
import { NewsModel } from '@/models/NewsModel';
import { ArrowLeft } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function News() {
    const { L } = useLang();

    const [items, setItems] = useState<NewsModel[] | null>(null);
    const [selectedNews, setSelectedNews] = useState<NewsModel | null>(null);

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

    // 处理返回列表
    const handleBackToList = () => {
        setSelectedNews(null);
    };

    // 如果选择了新闻详情，则显示详情页面
    if (selectedNews) {
        return (
            <main className="mx-auto max-w-7xl px-4 py-8">
                {/* 返回按钮 */}
                <button
                    onClick={handleBackToList}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
                >
                    <ArrowLeft className="h-4 w-4" />
                    {L('Back', '返回')}
                </button>

                <article className="rounded-xl border overflow-hidden">
                    {/* 封面图片 */}
                    {selectedNews.cover ? (
                        <img
                            src={selectedNews.cover}
                            alt={L(selectedNews.title, selectedNews.title_zh).toString()}
                            className="w-full h-auto object-cover"
                        />
                    ) : (
                        <div className="w-full h-80 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                            <span className="text-slate-500">{L('No image', '暫無圖片')}</span>
                        </div>
                    )}

                    <div className="p-6">
                        {/* 发布日期 */}
                        <div className="text-sm text-slate-500 mb-2">
                            {moment(selectedNews.updated_at).format('YYYY-MM-DD HH:mm')}
                        </div>

                        {/* 标题 */}
                        <h1 className="text-3xl font-bold mb-4">
                            {L(selectedNews.title, selectedNews.title_zh)}
                        </h1>
                        <div className="prose max-w-none">
                            {L(
                                selectedNews.description || '',
                                selectedNews.description_zh || ''
                            ) ? (
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: L(
                                            selectedNews.description || '',
                                            selectedNews.description_zh || ''
                                        ).toString().replaceAll('\n', '<br/>')
                                    }}
                                />
                            ) : (
                                <p className="text-slate-500 italic">
                                    {L('No content available.', '暫無內容.')}
                                </p>
                            )}
                        </div>
                    </div>
                </article>
            </main>
        );
    }

    // 否则显示新闻列表
    return (
        <main className="mx-auto max-w-7xl px-4 py-12">
            <div className="flex flex-col mb-4">
                <h2 className="text-2xl md:text-3xl font-extrabold">{L('News', '最新消息')}</h2>
                <p className="mt-2 text-slate-600">
                    {L(
                        'Check out the latest news about global issues and technology.',
                        '查閲關於全球資訊和科技發展的最新新聞'
                    )}
                </p>
            </div>

            {/* 添加加载状态 */}
            {isLoading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}

            {/* 添加错误状态 */}
            {error && (
                <div className="text-center py-12">
                    <div className="text-red-500 mb-2">Failed to load news.</div>
                    <div className="text-red-400 text-sm">Please try again later.</div>
                </div>
            )}

            {/* 显示新闻内容 */}
            {!isLoading && !error && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {(items || []).map((n) => (
                        // 点击卡片显示详情
                        <article
                            key={n.id}
                            onClick={() => setSelectedNews(n)}
                            className="rounded-xl border overflow-hidden flex flex-col hover:shadow-lg transition-shadow cursor-pointer"
                        >
                            {n.cover ? (
                                <img
                                    src={n.cover}
                                    alt={L(n.title, n.title_zh).toString()}
                                    className="w-full h-60 object-cover"
                                />
                            ) : (
                                <div className="w-full h-60 bg-gradient-to-br from-slate-200 to-slate-100 flex items-center justify-center">
                                    <span className="h-60 text-slate-500 text-sm">
                                        {L(' ', ' ')}
                                    </span>
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
                                            (n.description &&
                                                n.description.replace(/<[^>]*>/g, '')) ||
                                            '',
                                            (n.description_zh &&
                                                n.description_zh.replace(/<[^>]*>/g, '')) ||
                                            ''
                                        )}
                                    </p>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </main>
    );
}
