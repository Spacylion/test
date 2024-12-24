export type HttpMethod = 'GET' | 'POST';

export type RequestOptions = {
    method: HttpMethod;
    action: string;
    params?: Record<string, string | number>;
    body?: unknown;
};
