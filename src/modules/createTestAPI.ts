import 'whatwg-fetch';
export const createFetchMocked = <T>(mockedData: T) => {
   return jest.fn().mockImplementation(() => {
        return Promise.resolve(new Response(JSON.stringify(mockedData), {
            status: 200,
        }));
    });
};