import {setNewPageInQueryParams} from '../NewQueryParams';

describe('setNewPageInQueryParams:', () => {
    const page: number = 33;
    const queryParams: URLSearchParams = new URLSearchParams();
    it('should add page query param to url query params', async () => {
        const result = setNewPageInQueryParams(page, queryParams);
        expect(result.get('page')).toBe('33');
    });
});