import { AxiosRequestConfig } from 'axios';
export default class OpenAIModel {
    transcribe_audio() {
        const requestHeader: AxiosRequestConfig = {
            baseURL: 'https://pormhub.m2mda.com',
            // baseURL: 'http://localhost:3001',
            url: `/api/open_ai/transcribe_audio`,
            method: 'POST'
        };
        return requestHeader;
    }
}
