import {getImagePath} from '../getImagePath';

describe('getImagePath:', () => {
    const path: string = 'path';
    it('should return a correct path', async () => {
        const result = getImagePath(path);
        expect(result).toEqual('https://image.tmdb.org/t/p/original/path');
    });
});