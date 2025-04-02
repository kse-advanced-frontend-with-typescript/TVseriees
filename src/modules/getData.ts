export const getData = async (api_key: string, fetchAPI: typeof fetch, url: string) =>{

        const headers = new Headers();
        headers.set('Content-Type', 'application/json');
        headers.set('cache-control', 'no-cache');
        headers.set('Authorization', `Bearer ${api_key}`);

        const response = await fetchAPI(url, {headers: headers});
        if (!response.ok) throw Error(`Could not fetch required data at url ${url}: ${response.statusText}`);
        return await response.json();


};