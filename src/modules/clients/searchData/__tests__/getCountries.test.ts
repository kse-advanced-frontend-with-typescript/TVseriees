import {Countries, searchAPI} from '../index';
import {createFetchMocked} from '../../../createTestAPI';

describe('Search API: getCountries', () => {
    const API_KEY = 'API_KEY';

    describe('when response is valid', () => {
        const mockedCountriesData: Countries = [
            {iso_3166_1: 'JP', english_name: 'Japan'},
            {iso_3166_1: 'US', english_name: 'United States'},
            {iso_3166_1: 'ES', english_name: 'Spain'},
            {iso_3166_1: 'FR', english_name: 'France'},
            {iso_3166_1: 'DE', english_name: 'Germany'},
            {iso_3166_1: 'IT', english_name: 'Italy'},
            {iso_3166_1: 'BR', english_name: 'Brazil'},
        ];
        const expectedResult = new Map(mockedCountriesData.map(c=> [c.english_name, c.iso_3166_1]));

        const api = searchAPI(API_KEY, createFetchMocked(mockedCountriesData));

        it('should return the correct actor data with TV shows and images', async () => {
            const res = await api.getCountries();
            expect(res).toEqual(expectedResult);
        });
    });

    describe('when response is invalid', () => {
        const mockedCountriesData: Countries = [
            // @ts-expect-error We want to check invalid data
            {iso_639_1: 'fr', english_name: 10.5},
            // @ts-expect-error We want to check invalid data
            {iso_3166_1: null, english_name: 'Japan'},
            {iso_3166_1: 'US', english_name: 'United States'},
            // @ts-expect-error We want to check invalid data
            {iso_3166_1: 'ES', english_name: 888}


        ];
        const api = searchAPI(API_KEY, createFetchMocked(mockedCountriesData));
        it('should throw an error', async () => {
            await expect(api.getCountries()).rejects.toThrow('Data is not valid: /0/iso_3166_1 (Expected required property)');
        });
    });
});