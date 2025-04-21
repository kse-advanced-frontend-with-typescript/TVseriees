import {createReverseMap} from '../createReverseMap';

describe('createReverseMap:', () => {
    const map: Map<number, string> = new Map([
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
    ]);

    const expectedResult: Map<string, number> = new Map([
        ['a', 1],
        ['b', 2],
        ['c', 3]
    ]);

    it('should swap keys and values in places', () => {
        const result =  createReverseMap(map);
        expect(result).toEqual(expectedResult);
    });

});