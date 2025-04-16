export const getHeaders = (api_key: string, type: 'tmdb' | 'restdbio')=>{
    const headers = new Headers;
    headers.set('Content-Type', 'application/json');
    headers.set('cache-control', 'no-cache');
    if (type == 'tmdb') headers.set('Authorization', `Bearer ${api_key}`);
    else headers.set('x-apikey', api_key);
    return headers;
};