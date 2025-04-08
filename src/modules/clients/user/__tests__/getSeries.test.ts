import {SeriesResult, initUserAPI} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';

describe('User API: getSeries', () => {
    const API_KEY = 'API_KEY';

    describe('when response is valid', () => {
        const result: number[] = [86866, 444, 7777];
        const body: SeriesResult = {
            data:
                [ {serie_id: 86866},
                {serie_id: 444},
                {serie_id: 7777}],
            totals: {
                total: 3,
                count: 3,
                skip: 0,
                max: 50,
            }
        };
        const fetchMock = createFetchMockedWithBody(body);
        const api = initUserAPI(API_KEY, fetchMock);

        it('should return the result', async () => {
            const res = await api.getSeries(0, 50, 'user_id', 'favorites');
            expect(res).toEqual(result);;
            expect(fetchMock).toBeCalledWith(expect.stringContaining('totals=true'), expect.any(Object));
            expect(fetchMock).toBeCalledWith(expect.stringContaining('skip=0'), expect.any(Object));
            expect(fetchMock).toBeCalledWith(expect.stringContaining('max=50'), expect.any(Object));
            expect(fetchMock).toBeCalledWith(expect.stringContaining('favorites'), expect.any(Object));
            expect(fetchMock).toBeCalledWith(expect.stringContaining((`q=${encodeURIComponent(JSON.stringify({user_id: 'user_id'}))}`)), expect.any(Object));
        });
    });
    describe('when response is invalid', () => {
        const body: SeriesResult = {
            // @ts-expect-error We want to check invalid data
            data: 'huhuhiuhi',
            totals: {
                total:555,
                count: 555,
                skip: 0,
                max: 50,
            }
        };
        const api = initUserAPI(API_KEY, createFetchMockedWithBody(body));
        it('should throw an error', async () => {
            await expect(api.getSeries(0, 50, 'user_id', 'favorites')).rejects.toThrow('Data is not valid: /data (Expected array)');
        });
    });
});

