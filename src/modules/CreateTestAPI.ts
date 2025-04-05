export const createAPI = <T>(mockedData: T, apiMethod:(apiKey: string, fetchAPI: typeof  fetch)=>any) => {
    const API_KEY = 'API_KEY';
    const fetchMocked = jest.fn().mockImplementation(() => {
        return Promise.resolve(new Response(JSON.stringify(mockedData), {
            status: 200,
        }));
    });
    return apiMethod(API_KEY, fetchMocked);
};