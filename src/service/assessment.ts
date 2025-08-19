import type { CommonResponse } from '@/models/common';
import type { Fetcher } from 'swr';
import { post } from './base';
const baseURL = process.env.NEXT_PUBLIC_API_SERVER;

export const submit_assessment_records: Fetcher<
    CommonResponse & { data: string },
    { url?: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(baseURL + `/api/v1/assessment_records.json`, { body });
};
