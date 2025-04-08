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