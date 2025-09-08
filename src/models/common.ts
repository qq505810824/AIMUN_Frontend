export type CommonResponse = {
    success: true | false;
    message?: any;
    error?: string;
    errors?: string;
};

export type LoginResponse = {
    json: () => Promise<CommonResponse>;
    headers: any;
};
