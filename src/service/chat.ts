import { ParametersResponse } from '@/models/workflow';
import { Fetcher } from 'swr';
import { get, ssePost } from './base';
const baseURL = process.env.NEXT_PUBLIC_DIFY_SERVER;

export const fetchAppParams: Fetcher<ParametersResponse, { url: string }> = () => {
    return get<ParametersResponse>(baseURL + '/parameters', {}, { isDifyAPI: true });
};

export const sendChatMessage = async (
    body: Record<string, any>,
    {
        onData,
        onCompleted,
        onThought,
        onMessageReplace,
        onWorkflowStarted,
        onNodeStarted,
        onNodeFinished,
        onWorkflowFinished,
        onTextChunk,
        onTextReplace
    }: {
        onData: any;
        onCompleted: any;
        onThought: any;
        onMessageReplace: any;
        onWorkflowStarted: any;
        onNodeStarted: any;
        onNodeFinished: any;
        onWorkflowFinished: any;
        onTextChunk: any;
        onTextReplace: any;
    }
) => {
    return ssePost(
        `${process.env.NEXT_PUBLIC_DIFY_SERVER || 'https://aienglish-dify.docai.net/v1'}/chat-messages`,
        {
            body: {
                ...body,
                response_mode: 'streaming'
            }
        },
        {
            onData,
            onCompleted,
            onMessageReplace,
            onNodeStarted,
            onWorkflowStarted,
            onWorkflowFinished,
            onNodeFinished,
            onTextChunk,
            onTextReplace
        }
    );
};
