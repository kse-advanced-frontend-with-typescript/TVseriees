import {initSeriesAPI, Recommended} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';

describe('Series API: getRecommended', () => {
    const API_KEY = 'API_KEY';

    describe('when response is valid', () => {
        const body: Recommended = {
            results: [
                {
                    id: 1,
                    name: 'ffff',
                },
                {
                    id: 2,
                    name: 'ffff',
                }
            ]
        };
        it('should return the correct result', async () => {

            const fetchMock = createFetchMockedWithBody(body);
            const api = initSeriesAPI(API_KEY, fetchMock);
            const res = await api.getRecommended(22);
            expect(fetchMock).toBeCalledWith(expect.stringContaining('22'), expect.any(Object));
            expect(res).toEqual(body);
        });
    });



    describe('when response is not valid', () => {
        const body: Recommended = {
            results: [
                {
                    // @ts-expect-error We want to check invalid data
                    id: 'kjkjkjljlkjk',
                    name: 'ffff',
                },
                {
                    id: 2,
                    name: 'ffff',
                }
            ]
        };
        const api = initSeriesAPI(API_KEY,  createFetchMockedWithBody(body));

        it('should throw an error', async () => {
            await expect(api.getRecommended(22)).rejects.toThrow('Data is not valid: /results/0/id (Expected number)');
        });
    });

});