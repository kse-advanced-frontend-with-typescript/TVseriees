import { createFetchMockedWithBody } from '../fetchMocked';
import { getData } from '../getData';

describe('getData:', () => {
    const mockResponseData = { success: true, data: ['item1', 'item2'] };
    let fetchMock: jest.Mock;

    beforeEach(() => {
        fetchMock = createFetchMockedWithBody(mockResponseData);
    });

    it('should successfully fetch data', async () => {
        const url = 'url';
        const result = await getData(fetchMock, url, expect.any(Headers));
        expect(result).toEqual(mockResponseData);
        expect(fetchMock).toHaveBeenCalledWith(url, {
            headers: expect.any(Headers)
        });
    });



    // it('should fetch set headers for TMDB', async () => {
    //         const url = 'https://api.themoviedb.org/some-endpoint';
    //         await getData(API_KEY, fetchMock, url);
    //         const headers = fetchMock.mock.calls[0][1].headers;
    //         expect(headers.get('Content-Type')).toBe('application/json');
    //         expect(headers.get('cache-control')).toBe('no-cache');
    //         expect(headers.get('Authorization')).toBe(`Bearer ${API_KEY}`);
    //     });
    //
    //     it('should set headers RestDB.io', async () => {
    //         const url = 'https://somerestdbsite.restdb.io/some-endpoint';
    //         await getData(API_KEY, fetchMock, url);
    //         const headers = fetchMock.mock.calls[0][1].headers;
    //         expect(headers.get('Content-Type')).toBe('application/json');
    //         expect(headers.get('cache-control')).toBe('no-cache');
    //         expect(headers.get('x-apikey')).toBe(API_KEY);
    //     });

    it('should throw an error when response is not ok', async () => {
        const fetchMock = jest.fn().mockResolvedValue({
            ok: false,
            statusText: 'Not Found',
            url: 'test-url'
        });
        await expect(getData(fetchMock, 'test-url', expect.any(Headers))).rejects.toThrow('Could not fetch required data at url test-url: Not Found');
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});