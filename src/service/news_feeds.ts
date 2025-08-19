import type { CommonResponse } from '@/models/common';
import { NewsFeedDetailResponse, NewsFeedsResponse } from '@/models/reading';
import type { Fetcher } from 'swr';
import { get, post } from './base';
const baseURL = process.env.NEXT_PUBLIC_EXAMHERO_SERVER;

export const news_feeds_list: Fetcher<
    NewsFeedsResponse,
    { url?: string; params?: Record<string, any> }
> = ({ url, params }) => {
    return get<NewsFeedsResponse>(baseURL + `/api/v1/news_feeds/list.json`, { params });
};

export const news_feeds_detail: Fetcher<
    CommonResponse,
    { id: string; params?: Record<string, any> }
> = ({ id, params }) => {
    return get<CommonResponse>(baseURL + `/api/v1/news_feeds/${id}.json`, { params });
};

export const news_feeds_detail_form: Fetcher<
    NewsFeedDetailResponse,
    { url: string; params?: Record<string, any> }
> = ({ url, params }) => {
    return get<NewsFeedDetailResponse>(baseURL + url, { params });
};

export const submit_assessment_records: Fetcher<
    CommonResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(baseURL + `/api/v1/assessment_records.json`, { body });
};
