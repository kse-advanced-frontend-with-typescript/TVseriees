import {CollectionRecord, initUserAPI} from '../index';
import {createFetchMocked, createFetchMockedWithBody} from '../../../fetchMocked';

describe('User API: user serie collections manipulation', () => {
    const API_KEY = 'API_KEY';

    const user_id: string = '343535354';
    const serie_id: number = 12222;
    const _ids = ['4444', '4444', '5555'];
    const response: CollectionRecord = {
       _id: 'jhjkhk',
        serie_id: serie_id
    };
    let api: ReturnType<typeof initUserAPI>;
    let fetchMock: jest.Mock;
    describe('successful scenario: ', () => {
        beforeEach(() => {
            fetchMock = createFetchMockedWithBody(response);
            api = initUserAPI(API_KEY, fetchMock);
        });

        it('should remove a serie from a specified collection', async () => {
            await api.removeSerie(serie_id.toString(), 'towatch');

            expect(fetchMock).toBeCalledWith(
                expect.stringContaining(`towatch/${serie_id.toString()}`),
                expect.objectContaining({
                    method: 'DELETE',
                    headers: expect.any(Headers)
                })
            );
        });

        it('should add a serie to a specified collection and  return its id', async () => {
            const id: string = await api.addSerie(user_id, serie_id, 'watched');
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining('watched'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({ user_id: user_id, serie_id: serie_id}),
                    headers: expect.any(Headers)
                })
            );
            expect(id).toEqual(expect.any(String));
        });
        it('should remove all series from a specified collection', async () => {
            await api.removeAll(_ids, 'favorites');
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining('favorites'),
                expect.objectContaining({
                    method: 'DELETE',
                    headers: expect.any(Headers),
                    body: JSON.stringify(_ids)
                })
            );
        });
    });

    describe('failed scenarios: ', () => {
        beforeEach(() => {
            api = initUserAPI(API_KEY, createFetchMocked(false));
        });

        it('should throw an error if removal fails', async () => {
            await expect(api.removeSerie(serie_id.toString(), 'watched')).rejects.toThrow('Error removing data!');
        });


        it('should throw an error if addition fails', async () => {
            await expect(api.addSerie(user_id, serie_id, 'watched')).rejects.toThrow('Error adding data!');
        });

        it('should throw an error if removal of all series fails', async () => {
            await expect(api.removeAll(_ids,  'towatch')).rejects.toThrow('Error removing data!');
        });
    });
});