import {Collection} from '../../types';
import {initSeriesAPI} from '../clients/series';
import {initUserAPI} from '../clients/user';
import {getCardData} from '../getCardData';
import {createFetchMockedWithBody} from '../fetchMocked';
import {getImagePath} from '../getImagePath';

describe('getCardData', () => {
    const API_KEY = 'API_KEY';
    const startWith = 8;
    const perPage = 90;
    const userId = '45444';
    const collectionType: Collection = 'favorites';

    const mockUserAPIResponse = {
        data: [
            { serie_id: 101 },
            { serie_id: 102 }
        ],
        totals: {
            total: 2,
            count: 2,
            skip: 0,
            max: 90,
        }
    };

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

    const userAPI = initUserAPI(API_KEY, createFetchMockedWithBody(mockUserAPIResponse));
    const seriesAPI = initSeriesAPI(API_KEY, createFetchMockedWithBody(mockSeriesDetailResponse));

    it('should return formatted card data and total', async () => {
        const result = await getCardData(startWith, perPage, userId, collectionType, seriesAPI, userAPI);
        expect(result.series).toHaveLength(2);
        expect(result.series[0]).toEqual({
            id: 101,
            name: 'Mock Show',
            poster_path: getImagePath('/mock.jpg'),
            voteCount: 100,
            averageVote: 8.5
        });
        expect(result.total).toBe(2);
    });
});
