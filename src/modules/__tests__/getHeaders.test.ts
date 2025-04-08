import {getHeaders} from "../getHeaders";

describe('getHeaders:', () => {
    const API_KEY = 'API_KEY';

    it('should set common headers for both API types', () => {
        const tmdbHeaders = getHeaders(API_KEY, 'tmdb');
        expect(tmdbHeaders.get('Content-Type')).toBe('application/json');
        expect(tmdbHeaders.get('cache-control')).toBe('no-cache');

        const restdbioHeaders = getHeaders(API_KEY, 'restdbio');
        expect(restdbioHeaders.get('Content-Type')).toBe('application/json');
        expect(restdbioHeaders.get('cache-control')).toBe('no-cache');
    });

    it('should set Authorization header for TMDB API', () => {
        const headers = getHeaders(API_KEY, 'tmdb');
        expect(headers.get('Authorization')).toBe(`Bearer ${API_KEY}`);
        expect(headers.get('x-apikey')).toBeNull();
    });

    it('should set x-apikey header for RestDB.io API', () => {
        const headers = getHeaders(API_KEY, 'restdbio');
        expect(headers.get('x-apikey')).toBe(API_KEY);
        expect(headers.get('Authorization')).toBeNull();
    });

    it('should return a Headers object', () => {
        const headers = getHeaders(API_KEY, 'tmdb');
        expect(headers instanceof Headers).toBe(true);
    });
});