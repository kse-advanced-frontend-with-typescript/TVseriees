import {getSeriesData} from '../getSeriesData';
import {ConfigurationData, FilterState} from '../../../../types';
import {initSeriesAPI, SeriesResult} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';

describe('getSeriesData', () => {
    const pageToFetch = 1;
    const API_KEY = 'API_KEY';
    let api: ReturnType<typeof initSeriesAPI>;

    const body: SeriesResult = {
        page: 1,
        results: [
            {
                id: 1,
                name: 'ffff',
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

    const configuration: ConfigurationData = {
        languages: new Map([['English', 'en']]),
        countries: new Map([['United States', 'US']]),
        genres: new Map([['Drama', '18']]),
        code_languages: new Map()
    };

    beforeEach(() => {
        api = initSeriesAPI(API_KEY, createFetchMockedWithBody(body));
    });

    it('calls getByName if name is provided', async () => {
        jest.spyOn(api, 'getByName');
        const filters: FilterState = {
            name: 'Breaking Bad',
            year: '',
            language: '',
            country: '',
            genre: '',
            sortOption: ''
        };

        const result = await getSeriesData(pageToFetch, filters, 'popular', api, configuration);
        expect(api.getByName).toHaveBeenCalledWith(pageToFetch, filters.name, '');
        expect(result).toEqual(body);
    });

    it('calls getDynamic if other filters are provided', async () => {
        jest.spyOn(api, 'getDynamic');
        const filters: FilterState = {
            name: '',
            year: '2010',
            language: 'English',
            country: 'United States',
            genre: 'Drama',
            sortOption: 'popularity.desc'
        };

        const result = await getSeriesData(pageToFetch, filters, 'popular', api, configuration);
        expect(api.getDynamic).toHaveBeenCalledWith(pageToFetch, {
            name: '',
            year: '2010',
            language: 'en',
            country: 'US',
            genre: '18',
            sortOption: ''
        });
        expect(result).toEqual(body);
    });

    it('calls get if no filters are provided', async () => {
        jest.spyOn(api, 'get');
        const filters: FilterState = {
            name: '',
            year: '',
            language: '',
            country: '',
            genre: '',
            sortOption: ''
        };
        const result = await getSeriesData(pageToFetch, filters, 'trending', api, configuration);
        expect(api.get).toHaveBeenCalledWith(pageToFetch, 'trending');
        expect(result).toEqual(body);
    });
});