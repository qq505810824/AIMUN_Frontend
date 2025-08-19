import { CommonResponse } from './common';

export type NewsFeed = {
    id: number;
    title?: string;
    url?: string;
    work_count?: number;
    source?: string;
    theme?: string;
    created_at?: string;
    updated_at?: string;
};
export type NewsFeedsResponse = CommonResponse & {
    data?: NewsFeed[];
    feeds: NewsFeed[];
    meta?: {
        current_page: number;
        next_page: number;
        prev_page: number;
        total_count: number;
        total_pages: number;
    };
};

export type Question = {
    answer: string;
    indicator: string;
    options: { [key: string]: string };
    question: string;
    user_answer: string;
};

export type NewsFeedDetail = {
    id: string;
    topic?: string;
    text?: string;
    title: string;
    questions?: Question[];
    news_feed_id: number;
    created_at?: string;
    updated_at?: string;
};

export type NewsFeedDetailResponse = CommonResponse & {
    data: NewsFeedDetail;
};
