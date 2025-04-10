import {initUserAPI} from '../index';
import {createFetchMocked} from '../../../fetchMocked';

describe('User API: user serie collections manipulation', () => {
    const API_KEY = 'API_KEY';

    const user_id: string = '343535354';
    const serie_id: number = 12222;

    let api: ReturnType<typeof initUserAPI>;
    let fetchMock: jest.Mock;
    describe('successful scenario: ', () => {
        beforeEach(() => {
            fetchMock = createFetchMocked(true);
            api = initUserAPI(API_KEY, fetchMock);
        });

        it('should remove a serie from a specified collection', async () => {
            await api.removeSerie(user_id, serie_id, 'towatch');

            expect(fetchMock).toBeCalledWith(
                expect.stringContaining('towatch')&&
                expect.stringContaining((`q=${encodeURIComponent(
                    JSON.stringify({ user_id: user_id, serie_id: serie_id}))}`)),
                expect.objectContaining({
                    method: 'DELETE',
                    headers: expect.any(Headers)
                })
            );
        });

        it('should add a serie to a specified collection', async () => {
            await api.addSerie(user_id, serie_id, 'watched');
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining('watched'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ user_id: user_id, serie_id: serie_id}),
                    headers: expect.any(Headers)
                })
            );
        });
        it('should remove all series from a specified collection', async () => {
            await api.removeAll(user_id, 'favorites');
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining('favorites') &&
                expect.stringContaining((`q=${encodeURIComponent(
                    JSON.stringify({ user_id: user_id}))}`)),
                expect.objectContaining({
                    method: 'DELETE',
                    headers: expect.any(Headers)
                })
            );
        });
    });

    describe('failed scenarios: ', () => {
        beforeEach(() => {
            api = initUserAPI(API_KEY, createFetchMocked(false));
        });

        it('should throw an error if removal fails', async () => {
            await expect(api.removeSerie(user_id, serie_id, 'watched')).rejects.toThrow('Error removing data!');
        });

        it('should throw an error if addition fails', async () => {
            await expect(api.addSerie(user_id, serie_id, 'watched')).rejects.toThrow('Error adding data!');
        });

        it('should throw an error if removal of all series fails', async () => {
            await expect(api.removeAll(user_id,  'towatch')).rejects.toThrow('Error removing data!');
        });
    });
});