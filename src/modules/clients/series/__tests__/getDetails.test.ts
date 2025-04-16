import 'whatwg-fetch';
import {Cast, Details,initSeriesAPI} from '../index';
import {getImagePath} from '../../../getImagePath';
import {SerieDetails} from '../../../../Components/SeriesDetails/SeriesDetails';
describe('Series API: getImages', () => {
    const API_KEY = 'API_KEY';

    const createAPI = (serieData: Details, castData: Cast) => {
        const fetchMocked = jest.fn().mockImplementation((url: string) => {
            if (url.includes('/aggregate_credits')) {
                return Promise.resolve(new Response(JSON.stringify(castData), {
                    status: 200,
                }));
            } else {
                return Promise.resolve(new Response(JSON.stringify(serieData), {
                    status: 200,
                }));
            }
        });

        return {
            api: initSeriesAPI(API_KEY, fetchMocked),
            fetchMocked
        };
    };

    describe('when response is valid', () => {
        const serieData: Details = {
            id: 123,
            name: 'Stranger Things',
            overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
            poster_path: '/x2LSRK0Ws6iFmTWzvkKX2qXAzEB.jpg',
            first_air_date: '2016-07-15',
            episode_run_time: [50, 55],
            number_of_episodes: 34,
            number_of_seasons: 4,
            vote_average: 8.7,
            vote_count: 15234,
            original_language: 'en',
            original_name: 'Stranger Things',
            created_by: [
                { name: 'Matt Duffer' },
                { name: 'Ross Duffer' }
            ],
            genres: [
                { name: 'Drama' },
                { name: 'Science Fiction' },
                { name: 'Horror' }
            ],
            production_companies: [
                { name: 'Netflix' },
                { name: 'Monkey Massacre Productions' }
            ],
            production_countries: [
                { name: 'United States' }
            ]
        };

        const castData: Cast = {
            cast: [
                {id: 1, name: 'Millie Bobby Brown'},
                {id: 2, name: 'Winona Ryder'},
                {id: 3, name: 'David Harbour'},
            ]
        };


        const expectedResult: SerieDetails = {
            id: 123,
            episode_run_time: Math.round((50+55)/2),
            first_air_date: serieData.first_air_date,
            created_by: [serieData.created_by[0].name, serieData.created_by[1].name],
            genres: [serieData.genres[0].name, serieData.genres[1].name, serieData.genres[2].name],
            name: serieData.name,
            number_of_episodes: serieData.number_of_episodes!,
            number_of_seasons: serieData.number_of_seasons,
            original_language: serieData.original_language,
            original_name: serieData.original_name,
            production_companies: [serieData.production_companies[0].name, serieData.production_companies[1].name],
            production_countries: [serieData.production_countries[0].name],
            vote_average: serieData.vote_average,
            vote_count: serieData.vote_count,
            cast: castData.cast,
            poster_path: getImagePath(serieData.poster_path!),
            overview: serieData.overview
        };

        const {api, fetchMocked} = createAPI(serieData, castData);

        it('should return the details correctly', async () => {
            const res = await api.getDetails(123);
            expect(res).toEqual(expectedResult);
        });

        it('should construct correct url for getImages', async () => {
            await api.getDetails(123);
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('123'), expect.any(Object));
        });
    });

    describe('when response is not valid', () => {

        const serieData: Details ={
            // @ts-expect-error We want to check invalid data
            id: null,
            // @ts-expect-error We want to check invalid data
            name: 12334,
            overview: 'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
            poster_path: '/x2LSRK0Ws6iFmTWzvkKX2qXAzEB.jpg',
            first_air_date: '2016-07-15',
            episode_run_time: [50, 55],
            number_of_episodes: 34,
            number_of_seasons: 4,
            vote_average: 8.7,
            vote_count: 15234,
            original_language: 'en',
            original_name: 'Stranger Things',
            created_by: [],
            genres: [],
            production_companies: [],
            production_countries: []
        };

        const castData: Cast = {
            cast: []
        };

        const {api} = createAPI(serieData, castData);

        it('should throw an error for invalid image data', async () => {
            await expect(api.getDetails(4)).rejects.toThrow('Data is not valid: /id (Expected number)');
        });
    });
});