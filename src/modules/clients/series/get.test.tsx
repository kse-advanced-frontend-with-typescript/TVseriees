import {seriesAPI} from './index';
import {SeriesResult} from './index';
import {createAPI} from '../../CreateTestAPI';

describe('Series API: get', () => {
    const API_KEY = 'API_KEY';
    describe('when response is valid', () => {
        const body: SeriesResult = {
            page: 1,
            results: [
                {
                    id: 1,
                    name: 'aaaa',
                    poster_path: 'hhhh'
                },
                {
                    id: 2,
                    name: 'ffff',
                    poster_path: 'ffff'
                }
            ],
            total_pages: 444,
            total_results: 44444

        };

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = seriesAPI(API_KEY, fetchMocked);

        it('should return the result', async () => {
            const res = await api.get();
            expect(res).toEqual(body);

        });

        it('it should construct correct url', async () => {
            await api.get(10, 'popular');
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('popular'), expect.any(Object));
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('page=10'), expect.any(Object));
        });
    });
    describe('when response is not valid', () => {
        const body: SeriesResult = {
            page: 1,
            results: [
                {
                    id: 1,
                    name: 'aaaa',
                    // @ts-expect-error We want to check invalid data
                    poster_path: 111111
                },
                {
                    // @ts-expect-error We want to check invalid data
                    id: '2',
                    name: 'ffff',
                    poster_path: 'ffff'
                }
            ],
            total_pages: 444,
            total_results: 44444

        };


        const api = createAPI(body, seriesAPI);

        it('should throw an error', async () => {
            await expect(api.get()).rejects.toThrow('Data is not valid: /results/0/poster_path (Expected union value)');
        });
    });

});