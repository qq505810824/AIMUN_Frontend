import type { CommonResponse, LoginResponse, UserProfileResponse } from '@/models/common';
import type { Fetcher } from 'swr';
import { del, get, post, put } from './base';

import { del as consoleDel, get as consoleGet, post as consolePost } from './base';

const baseURL = process.env.NEXT_PUBLIC_API_SERVER;

function getAction(action: 'get' | 'post' | 'del' | 'patch', isInstalledApp: boolean) {
    switch (action) {
        case 'get':
            return isInstalledApp ? consoleGet : get;
        case 'post':
            return isInstalledApp ? consolePost : post;
        case 'del':
            return isInstalledApp ? consoleDel : del;
    }
}

export const login: Fetcher<
    LoginResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(baseURL + url, { body }, { needAllResponseContent: true, isLoginAPI: true });
};

export const update_password: Fetcher<
    CommonResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return put(baseURL + url, { body });
};

export const get_info: Fetcher<
    UserProfileResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return get<UserProfileResponse>(baseURL + url, { params });
};

export const getTags: Fetcher<CommonResponse, { url: string; params: Record<string, any> }> = ({
    url,
    params
}) => {
    return get<CommonResponse>(baseURL + url, { params });
};

export const updateLinkSetInfo: Fetcher<
    CommonResponse,
    { id: number; name: string; description: string }
> = ({ id, name, description }) => {
    return put<CommonResponse>(baseURL + `link_sets/${id}.json`, { body: { name, description } });
};

export const deleteLinkSet: Fetcher<CommonResponse, string> = (id) => {
    return del<CommonResponse>(`link_sets/${id}.json`);
};

export const fetchAppDetail = ({ url, id }: { url: string; id: string }) => {
    return get<CommonResponse>(`${url}/${id}`);
};

export const audioToText = (url: string, body: FormData) => {
    return post(
        'https://dify.docai.net/v1' + url,
        { body },
        { bodyStringify: false, deleteContentType: true, isDifyAPI: true }
    ) as Promise<{ text: string }>;
};
