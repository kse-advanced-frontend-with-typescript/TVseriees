import {Genres, searchAPI} from './index';
import {createAPI} from '../../CreateTestAPI';

describe('Search API: getGenres', () => {
    describe('when response is valid', () => {

        const mockedGenresData: Genres = {
            genres:[
                {id: 1, name: 'comedy'},
                {id: 2, name: 'romance'},
                {id: 3, name: 'horror'},
                {id: 4, name: 'family'},
            ]
        };

        const expectedResult = new Map(mockedGenresData.genres.map(g=> [g.name, g.id.toString()]));

        const api = createAPI(mockedGenresData, searchAPI);

        it('should return the correct actor data with TV shows and images', async () => {
            const res = await api.getGenres();
            expect(res).toEqual(expectedResult);
        });
    });

    describe('when response is invalid', () => {
        const mockedGenresData: Genres = {
            genres:[
                // @ts-expect-error We want to check invalid data
                {id: null, name: 'comedy'},
                // @ts-expect-error We want to check invalid data
                {id: '1', name: 4444},
            ]
        };
        const api = createAPI(mockedGenresData, searchAPI);

        it('should throw an error', async () => {
            await expect(api.getGenres()).rejects.toThrow('Data is not valid: /genres/0/id (Expected number)');
        });
    });
});