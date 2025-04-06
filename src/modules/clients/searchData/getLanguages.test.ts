import {Languages, searchAPI} from './index';
import {createAPI} from '../../CreateTestAPI';

describe('Search API: getLanguages', () => {

    describe('when response is valid', () => {
        const mockedLanguagesData: Languages = [
            {iso_639_1: 'ja', english_name: 'Japanese'},
            {iso_639_1: 'en', english_name: 'English'},
            {iso_639_1: 'es', english_name: 'Spanish'},
            {iso_639_1: 'fr', english_name: 'French'},
            {iso_639_1: 'de', english_name: 'German'},
            {iso_639_1: 'it', english_name: 'Italian'},
            {iso_639_1: 'pt', english_name: 'Portuguese'},

        ];
        const expectedResult = new Map(mockedLanguagesData.map(lan=> [lan.english_name, lan.iso_639_1]));

        const {api} = createAPI(mockedLanguagesData, searchAPI);

        it('should return the correct actor data with TV shows and images', async () => {
            const res = await api.getLanguages();
            expect(res).toEqual(expectedResult);
        });
    });

    describe('when response is invalid', () => {
        const mockedLanguagesData: Languages = [
            {iso_639_1: 'ja', english_name: 'Japanese'},
            // @ts-expect-error We want to check invalid data
            {iso_639_1: null, english_name: 'English'},
            // @ts-expect-error We want to check invalid data
            {iso_639_1: 'es', english_name: 8888},
            // @ts-expect-error We want to check invalid data
            {iso_639_1: 'fr', english_name: 10.5},
            {iso_639_1: 'de', english_name: 'German'},
            {iso_639_1: 'it', english_name: 'Italian'},
            {iso_639_1: 'pt', english_name: 'Portuguese'},

        ];
        const {api} = createAPI(mockedLanguagesData, searchAPI);

        it('should throw an error', async () => {
            await expect(api.getLanguages()).rejects.toThrow('Data is not valid: /1/iso_639_1 (Expected string)');
        });
    });
});