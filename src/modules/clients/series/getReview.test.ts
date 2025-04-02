import {Review, seriesAPI} from './index';

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

        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = seriesAPI(API_KEY, fetchMocked);

        it('should return the result', async () => {
            const res = await api.getReviews(2);
            expect(res).toEqual(body);

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


        const fetchMocked = jest.fn().mockImplementation(() => {
            return new Response(JSON.stringify(body), {
                status: 200,
            });
        });

        const api = seriesAPI(API_KEY, fetchMocked);

        it('should throw an error', async () => {
            await expect(api.getReviews(2)).rejects.toThrow('Data is not valid: /results/0/author (Expected string)');
        });
    });

});