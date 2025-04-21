import {schemaErrorToError} from '../schemaErrorToError';
import {ValueError} from '@sinclair/typebox/build/cjs/errors/errors';

describe('schemaErrorToError', () => {
    it('should format ValueError correctly', () => {
        const valueError = { path: 'id', message: 'required field' } as ValueError;
        const result = schemaErrorToError(valueError);
        expect(result.message).toBe('Data is not valid: id (required field)');
    });

    it('should handle undefined ValueError', () => {
        const result = schemaErrorToError(undefined);
        expect(result.message).toBe('Data is not valid: undefined (undefined)');
    });
});