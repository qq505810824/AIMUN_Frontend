import type {
    CommonResponse,
    EssayAssignmentDetailResponse,
    EssayAssignmentResponse,
    EssayGradingDetailResponse,
    EssayGradingResponse,
    JoinAssignmentResponse
} from '@/models/common';
import type { Fetcher } from 'swr';
import { del, get, post, put } from './base';
const baseURL = process.env.NEXT_PUBLIC_API_SERVER;

export const get_essay_assignments: Fetcher<
    EssayAssignmentResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return get<EssayAssignmentResponse>(baseURL + url, { params });
};

export const create_essay_assignments: Fetcher<
    CommonResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(baseURL + url, { body });
};

export const get_essay_assignments_by_id: Fetcher<
    EssayAssignmentDetailResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return get<EssayAssignmentDetailResponse>(baseURL + url, { params });
};

export const update_essay_assignments_by_id: Fetcher<
    CommonResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return put(baseURL + url, { body });
};

export const delete_essay_assignments_by_id: Fetcher<
    EssayAssignmentDetailResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return del<EssayAssignmentDetailResponse>(baseURL + url, { params });
};

export const get_essay_gradings: Fetcher<
    EssayGradingResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return get<EssayGradingResponse>(baseURL + url, { params });
};

export const create_essay_gradings: Fetcher<
    CommonResponse & { data: string },
    { url: string; body: Record<string, any> }
> = ({ url, body }) => {
    return post(baseURL + url, { body });
};

export const get_essay_gradings_by_id: Fetcher<
    EssayGradingDetailResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return get<EssayGradingDetailResponse>(baseURL + url, { params });
};

export const join_assignment_by_code: Fetcher<
    JoinAssignmentResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return get<JoinAssignmentResponse>(baseURL + url, { params });
};

export const get_essay_assignments_by_id_read: Fetcher<
    JoinAssignmentResponse,
    { url: string; params: Record<string, any> }
> = ({ url, params }) => {
    return get<JoinAssignmentResponse>(baseURL + url, { params });
};
