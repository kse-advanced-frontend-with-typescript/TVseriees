import {createFetchMocked} from '../createTestAPI';
import {getData} from '../getData';

describe('getData:', () => {
    const API_KEY = 'API_KEY';
    const url = 'url';
    const mockResponseData = { success: true, data: ['item1', 'item2'] };

    it('should fetch data successfully', async () => {
        const fetchMock = createFetchMocked(mockResponseData);
        const result = await getData(API_KEY, fetchMock, url);
        expect(result).toEqual(mockResponseData);
        expect(fetchMock).toHaveBeenCalledWith(url, {
            headers: expect.any(Headers)
        });
        const headers = fetchMock.mock.calls[0][1].headers;
        expect(headers.get('Content-Type')).toBe('application/json');
        expect(headers.get('cache-control')).toBe('no-cache');
        expect(headers.get('Authorization')).toBe(`Bearer ${API_KEY}`);
    });

    it('should throw an error when response is not ok', async () => {
        const fetchMock = jest.fn().mockResolvedValue({
            ok: false,
            statusText: 'Not Found'
        });

        await expect(getData(API_KEY, fetchMock, url))
            .rejects
            .toThrow(`Could not fetch required data at url ${url}: Not Found`);

        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

});