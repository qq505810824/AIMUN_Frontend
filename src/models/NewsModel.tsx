export interface NewsModel {
    id: number;

    title: string;
    title_zh: string;
    description?: string;
    description_zh?: string;
    cover?: string;
    created_at?: string;
    updated_at?: string;
    published_at?: string;
}
