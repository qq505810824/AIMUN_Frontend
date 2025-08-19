import { PUBLIC_API_SPEAKING } from '@/config';
import { Sentence } from '@/models/speaking';
import type { Fetcher } from 'swr';
import { post } from './base';

export const processInputSentence: Fetcher<
    Sentence & { data: string },
    { url?: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(PUBLIC_API_SPEAKING + `/processInputSentence`, { body });
};
