import 'whatwg-fetch';
export const createFetchMockedWithBody = <T>(mockedData: T) => {
   return jest.fn().mockImplementation(() => {
        return Promise.resolve(new Response(JSON.stringify(mockedData), {
            status: 200,
        }));
    });
};

export const createFetchMocked = (ok: boolean) => {
    return jest.fn().mockImplementation(() => {
        return Promise.resolve( {
            ok: ok,
        });
    });
};