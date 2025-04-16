import {initSeriesAPI} from '../clients/series';
import {getCardData} from '../getCardData';
import {createFetchMockedWithBody} from '../fetchMocked';
import {getImagePath} from '../getImagePath';

describe('getCardData', () => {
    const API_KEY = 'API_KEY';
    const startWith = 1;
    const perPage = 4;

    const series_ids: number[] = [101, 200, 3000, 8888, 9999, 9999999];
    const mockSeriesDetailResponse = {
        id: 101,
        name: 'Mock Show',
        poster_path: '/mock.jpg',
        vote_count: 100,
        vote_average: 8.5,
        episode_run_time: [45],
        first_air_date: '2020-01-01',
        number_of_episodes: 10,
        number_of_seasons: 1,
        original_language: 'en',
        original_name: 'Mock Show Original',
        created_by: [{ name: 'Creator' }],
        genres: [{ name: 'Drama' }],
        production_companies: [{ name: 'Fake Studio' }],
        production_countries: [{ name: 'USA' }],
        cast: [{ id: 1, name: 'Actor' }],
        overview: 'Overview',
    };

    const seriesAPI = initSeriesAPI(API_KEY, createFetchMockedWithBody(mockSeriesDetailResponse));

    it('should return formatted card data and total', async () => {
        const result = await getCardData(startWith, perPage, series_ids, seriesAPI);
        expect(result).toHaveLength(4);
        expect(result[0]).toEqual({
            id: 101,
            name: 'Mock Show',
            poster_path: getImagePath('/mock.jpg'),
            voteCount: 100,
            averageVote: 8.5
        });
    });
});
