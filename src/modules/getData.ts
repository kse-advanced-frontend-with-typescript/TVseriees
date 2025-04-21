export const getData = async (fetchAPI: typeof fetch, url: string, headers: Headers) =>{
        const response = await fetchAPI(url, {headers: headers});
        if (!response.ok) throw Error(`Could not fetch required data at url ${url}: ${response.statusText}`);
        return await response.json();
};