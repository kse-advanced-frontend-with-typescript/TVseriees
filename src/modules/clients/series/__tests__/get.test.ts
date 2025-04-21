import {initSeriesAPI} from '../index';
import {SeriesResult} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';
import {FilterState} from '../../../../types';

describe('Series API: get', () => {
    const API_KEY = 'API_KEY';
    const filters: FilterState = {
        name: 'Harry Potter',
        year: '2013',
        sortOption: 'popularity.asc',
        language: 'english',
        genre: 'comedy',
        country: 'england'
    };
    describe('when response is valid', () => {
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
        describe('should return the result', ()=> {
            test.each([
                ['plain get', () => api.get()],
                ['get by name', () => api.getByName(1, 'uhyuyu')],
                ['plain get dynamic', () => api.getDynamic(1, filters)]
            ])('when %s called', async (testName, apiCall)=>{
                const res = await apiCall();
                expect(res).toEqual(body);
            });
        });

        const fetchMocked = createFetchMockedWithBody(body);
        const api = initSeriesAPI(API_KEY, fetchMocked);

        describe('should construct correct url', ()=>{
            it('when get with dynamic query parameters is called', async () => {
                await api.getDynamic(10, filters);
                expect(fetchMocked).toBeCalledWith(expect.stringContaining('page=10'), expect.any(Object));
                expect(fetchMocked).toBeCalledWith(expect.stringContaining(`first_air_date_year=${filters.year}`), expect.any(Object));
                expect(fetchMocked).toBeCalledWith(expect.stringContaining(`with_genres=${filters.genre}`), expect.any(Object));
                expect(fetchMocked).toBeCalledWith(expect.stringContaining(`with_original_language=${filters.language}`), expect.any(Object));
                expect(fetchMocked).toBeCalledWith(expect.stringContaining(`with_origin_country=${filters.country}`), expect.any(Object));

            });
            it('when plain get is called', async () => {
                await api.get(10, 'popular');
                expect(fetchMocked).toBeCalledWith(expect.stringContaining('popular'), expect.any(Object));
                expect(fetchMocked).toBeCalledWith(expect.stringContaining('page=10'), expect.any(Object));
            });
            it('when get by name called', async () => {
                await api.getByName(10, 'Harry Potter', '2013');
                expect(fetchMocked).toBeCalledWith(expect.stringContaining('page=10'), expect.any(Object));
                expect(fetchMocked).toBeCalledWith(expect.stringContaining('query=Harry+Potter'), expect.any(Object));
                expect(fetchMocked).toBeCalledWith(expect.stringContaining('first_air_date_year=2013'), expect.any(Object));
            });
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

        const api = initSeriesAPI(API_KEY,  createFetchMockedWithBody(body));
        test.each([
            ['plain get', () => api.get()],
            ['get by name', () => api.getByName(1, 'uhyuyu')],
            ['plain get dynamic', () => api.getDynamic(1, filters)]
        ])('should throw an error when %s called', async (testName, apiCall)=>{
            await expect(apiCall()).rejects.toThrow('Data is not valid: /results/0/poster_path (Expected union value)');
        });
    });

});