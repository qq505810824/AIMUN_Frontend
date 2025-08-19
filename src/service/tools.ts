import type { HtmlToPdfResponse } from '@/models/common';
import type { Fetcher } from 'swr';
import { post } from './base';
const baseURL = process.env.NEXT_PUBLIC_API_SERVER;

export const html_to_pdf: Fetcher<
    HtmlToPdfResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(baseURL + `/api/v1/tools/upload_html_to_pdf`, { body });
};
