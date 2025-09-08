import { NewsModel } from '@/models/NewsModel';
import {
    createApp,
    deleteApp,
    getAllApps,
    getAppDetail,
    getAppDetailById,
    getRandomApps,
    searchApp,
    updateApp
} from '@/service/news_server';

import useSWR from 'swr';

// 应用数据 fetcher 函数
const appsFetcher = async (options?: {}) => {
    const { data, error } = await getAllApps(options);
    if (error) throw error;
    return data || [];
};

// 自定义 hook 使用 SWR 获取所有应用
export const useNewsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR('newss', () => appsFetcher(options), {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data as NewsModel[],
        isLoading,
        isError: error,
        mutate
    };
};

// 自定义 hook 使用 SWR 获取所有应用
export const randomnewsData = (options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(() => options, getRandomApps, {
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        dedupingInterval: 60000 // 1分钟内不重复请求
    });

    return {
        data: data?.data as NewsModel[],
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailFetcher = async (id: number, accountId?: string) => {
    const { data, error } = await getAppDetail(id, accountId);
    if (error) throw error;
    return data || [];
};

export const useNewsDetailData = (id: number, accountId?: string, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        id ? 'detail_news_' + id : null,
        () => appDetailFetcher(id, accountId),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as NewsModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

const appDetailByIdFetcher = async (id: number) => {
    const { data, error } = await getAppDetailById(id);
    if (error) throw error;
    return data || [];
};

export const useNewsDetailByIdData = (id: number, options = {}) => {
    const { data, error, isLoading, mutate } = useSWR(
        'detail_news_by_id_' + id,
        () => appDetailByIdFetcher(id),
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 20000, // 1分钟内不重复请求
            ...options
        }
    );
    return {
        data: data as NewsModel | undefined,
        isLoading,
        isError: error,
        mutate
    };
};

export const useNewsOperations = () => {
    const addnews = async (appData: Omit<NewsModel, 'id'>) => {
        return handleAppOperation(async () => {
            return await createApp(appData);
        });
    };

    const updateNews = async (id: number, updatedData: Partial<NewsModel>) => {
        return handleAppOperation(async () => {
            return await updateApp(id, updatedData);
        });
    };

    const deleteNews = async (id: number, community_id?: number) => {
        return await deleteApp(id, community_id);
    };

    const searchNews = async (options?: any) => {
        return handleAppOperation(async () => {
            return await searchApp(options);
        });
    };

    const mutate = async (options?: any) => {
        return handleAppOperation(async () => {
            return useNewsData(options);
        });
    };
    return { addnews, updateNews, deleteNews, searchNews, mutate };
};

// 处理应用操作的通用函数
const handleAppOperation = async (operation: () => Promise<any>) => {
    try {
        const { data, error } = await operation();
        if (error) throw error;
        return { data, error: null };
    } catch (error) {
        return { data: null, error };
    }
};
