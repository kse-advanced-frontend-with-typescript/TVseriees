import { setNewQueryParams } from '../NewQueryParams';
import { FilterState } from '../../types';

describe('setNewQueryParams:', () => {
    const filter: FilterState = {
        genre: 'comedy',
        language: 'English',
        country: 'England',
        sortOption: 'popular ascending',
        year: '1999',
        name: 'Vampire diaries'
    };

    const queryParams: URLSearchParams = new URLSearchParams();

    it('should set  filters correctly', () => {
        let result = queryParams;
        for (const key of Object.keys(filter) as (keyof FilterState)[]) {
            result = setNewQueryParams(key, filter[key], result);
        }
        expect(result.get('genre')).toBe(filter.genre);
        expect(result.get('language')).toBe(filter.language);
        expect(result.get('country')).toBe(filter.country);
        expect(result.get('sortOption')).toBe(filter.sortOption);
        expect(result.get('year')).toBe(filter.year);
        expect(result.get('name')).toBe(filter.name);
    });
});
