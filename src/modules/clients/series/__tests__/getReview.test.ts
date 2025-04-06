import {Review, seriesAPI} from '../index';
import {createFetchMocked} from '../../../createTestAPI';

describe('Series API: getReviews', () => {
    const API_KEY = 'API_KEY';

    describe('when response is valid', () => {
        const body: Review = {
            results: [
                {
                    author: 'ssss',
                    content: 'ssjhkhkj'
                },
                {
                    author: 'ggg',
                    content: 'ssjhgggkhkj'
                }
            ]
        };

        const fetchMocked= createFetchMocked(body);
        const api = seriesAPI(API_KEY, fetchMocked);

        it('should return the result', async () => {
            const res = await api.getReviews(2);
            expect(res).toEqual(body);

        });
        it('should construct correct url', async()=>{
            await api.getReviews(10);
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('10'), expect.any(Object));
        });
    });
    describe('when response is not valid', () => {
        const body: Review = {
            results: [
                {
                    // @ts-expect-error We want to check invalid data
                    author: 444,
                    content: 'ssjhkhkj'
                },
                {
                    author: 'ggg',
                    content: 'ssjhgggkhkj'
                }
            ]

        };

        const api =seriesAPI(API_KEY, createFetchMocked(body));

        it('should throw an error', async () => {
            await expect(api.getReviews(2)).rejects.toThrow('Data is not valid: /results/0/author (Expected string)');
        });
    });

});