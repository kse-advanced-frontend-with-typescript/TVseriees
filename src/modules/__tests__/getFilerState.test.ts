import {getFilterState} from '../getFilterState';
import {FilterState} from '../../types';

describe('getFilterState', () => {
    it('should return correct filter state from full query params', () => {
        const expected: FilterState = {
            genre: 'comedy',
            language: 'English',
            country: 'England',
            sortOption: 'popular descending',
            year: '2005',
            name: 'Vampire Diaries'
        };
        const searchParams = new URLSearchParams({
            genre: 'comedy',
            language: 'English',
            country: 'England',
            sortOption: 'popular descending',
            year: '2005',
            name: 'Vampire Diaries'
        });
        expect(getFilterState(searchParams)).toEqual(expected);
    });

    it('should return empty strings for missing params', () => {
        const searchParams = new URLSearchParams();

        const expected: FilterState = {
            genre: '',
            language: '',
            country: '',
            sortOption: '',
            year: '',
            name: ''
        };

        expect(getFilterState(searchParams)).toEqual(expected);
    });

    it('should handle partial params correctly', () => {
        const searchParams = new URLSearchParams({
            genre: 'drama',
            year: '2010'
        });

        const expected: FilterState = {
            genre: 'drama',
            language: '',
            country: '',
            sortOption: '',
            year: '2010',
            name: ''
        };

        expect(getFilterState(searchParams)).toEqual(expected);
    });
});
