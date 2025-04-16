import { Collection, State } from '../../types';
import { AppContext } from '../../context';
import { createSeriesOperations, SeriesOperations } from '../createSeriesOperations';

describe('Test: createSeriesOperations', () => {
    const serie_id: number = 22333;
    const _id: string = '1212121';
    const userId: string = '1424343';
    const collection: Collection = 'watched';
    let setState: jest.Mock;
    let mockContext: AppContext;
    let operations: SeriesOperations;
    let prevState: State;

    const verifyStateUpdates = (error: boolean): void => {
        expect(setState).toHaveBeenCalledTimes(2);
        expect(((setState as jest.Mock).mock.calls[0][0])(prevState)).toEqual({ loading: true, error: false });
        expect(((setState as jest.Mock).mock.calls[1][0])(prevState)).toEqual({ loading: false, error: error });
    };

    beforeEach(() => {
        setState = jest.fn();
        prevState = { loading: false, error: false };
    });

    describe('Successful scenarios: ', ()=>{
        beforeEach(() => {
            mockContext = {
                user: { _id: userId },
                userAPI: {
                    addSerie: jest.fn().mockResolvedValue('567587567868'),
                    removeSerie: jest.fn().mockResolvedValue({ ok: true, status: 200 }),
                    removeAll: jest.fn().mockResolvedValue({ ok: true, status: 200 }),
                },
                userCollections: {
                    watched: new Map([[serie_id, _id]])
                }
            } as unknown as AppContext;
            operations = createSeriesOperations(setState, mockContext);
        });

        it('should delete a serie', async () => {
            await operations.deleteSerie(serie_id, collection);
            verifyStateUpdates(false);
            expect(mockContext.userAPI.removeSerie).toHaveBeenCalledWith(_id, collection);
            expect(mockContext.userCollections[collection].has(serie_id)).toBe(false);
        });

        it('should add a serie', async () => {
            const newSerieId = 44555;
            await operations.addSerie(newSerieId, collection);
            verifyStateUpdates(false);
            expect(mockContext.userAPI.addSerie).toHaveBeenCalledWith(userId, newSerieId, collection);
            expect(mockContext.userCollections[collection].get(newSerieId)).toBe('567587567868');
        });

        it('should delete all series', async () => {
            const anotherSerieId = 44555;
            const anotherDocumentId = '777777';
            mockContext.userCollections[collection].set(anotherSerieId, anotherDocumentId);
            await operations.deleteAll(collection);
            verifyStateUpdates(false);
            expect(mockContext.userAPI.removeAll).toHaveBeenCalledWith([_id, anotherDocumentId], collection);
            expect(mockContext.userCollections[collection].size).toBe(0);
        });
    });

    describe('Unsuccessful scenarios: ', ()=>{
        beforeEach(() => {
            mockContext = {
                user: { _id: userId },
                userAPI: {
                    addSerie: jest.fn().mockRejectedValueOnce(new Error('Add error')),
                    removeSerie: jest.fn().mockRejectedValueOnce(new Error('Remove error')),
                    removeAll: jest.fn().mockRejectedValueOnce(new Error('RemoveAll error')),
                },
                userCollections: {
                    watched: new Map([[serie_id, _id]])
                }
            } as unknown as AppContext;
            operations = createSeriesOperations(setState, mockContext);
            jest.spyOn(console, 'error').mockImplementation(()=>{});
        });

        afterEach(()=>{
            jest.restoreAllMocks();
        });

        it('should not delete a serie', async () => {
            await operations.deleteSerie(serie_id, collection);
            verifyStateUpdates(true);
            expect(mockContext.userCollections[collection].has(serie_id)).toBe(true);
        });

        it('should not add a serie', async () => {
            await operations.addSerie(serie_id, collection);
            verifyStateUpdates(true);
            expect(mockContext.userCollections[collection].get(serie_id)).toBe(_id);
        });

        it('should not delete series', async () => {
            await operations.deleteAll(collection);
            verifyStateUpdates(true);
            expect(mockContext.userCollections[collection].size).toBe(1);
        });
    });
});