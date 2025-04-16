import {SeriesResult, initUserAPI} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';

describe('User API: getSeries', () => {
    const API_KEY = 'API_KEY';

    describe('when response is valid', () => {
        const body: SeriesResult = [
           {_id: '2222', serie_id: 86866},
                {_id: 'e464ee', serie_id: 444},
                {_id: '45345', serie_id: 7777},
        ];


        const expectedResult: Map<number, string> = new Map([
            [86866, '2222'],
            [444, 'e464ee'],
            [7777, '45345'],
        ]);

        const fetchMock = createFetchMockedWithBody(body);
        const api = initUserAPI(API_KEY, fetchMock);

        it('should return the result', async () => {
            const res = await api.getSeries('user_id', 'favorites');
            expect(res).toEqual(expectedResult);;
            expect(fetchMock).toBeCalledWith(expect.stringContaining('favorites'), expect.any(Object));
            expect(fetchMock).toBeCalledWith(expect.stringContaining((`q=${encodeURIComponent(JSON.stringify({user_id: 'user_id'}))}`)), expect.any(Object));
        });
    });
    describe('when response is invalid', () => {
        const body: SeriesResult = {
            // @ts-expect-error We want to check invalid data
            data: 'huhuhiuhi',
        };
        const api = initUserAPI(API_KEY, createFetchMockedWithBody(body));
        it('should throw an error', async () => {
            await expect(api.getSeries('user_id', 'favorites')).rejects.toThrow('Data is not valid:  (Expected array)');
        });
    });
});

