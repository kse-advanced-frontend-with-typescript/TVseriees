import {Collection} from '../types';
import {Dispatch, SetStateAction} from 'react';
import {AppContext} from '../context';

type StateWithLoadingAndError = {
    loading: boolean;
    error: boolean;
}

type SeriesOperations = {
    deleteSerie: (serie_id: number, collection: Collection) => Promise<void>;
    addSerie: (serie_id: number, collection: Collection) => Promise<void>;
    deleteAll: (collection: Collection) => Promise<void>;
}

export const createSeriesOperations = <T extends StateWithLoadingAndError>(
    setState: Dispatch<SetStateAction<T>>,
    context: AppContext
): SeriesOperations => {
    const executeOperation = async (operation: () => Promise<void>): Promise<void> => {
        try {
            setState(prev => ({ ...prev, loading: true, error: false } as T));
            await operation();
            setState(prev => ({ ...prev, loading: false } as T));
        } catch (e) {
            console.error('Operation error:', e);
            setState(prev => ({ ...prev, loading: false, error: true } as T));
        }
    };

    return {
        deleteSerie: async (serie_id: number, collection: Collection): Promise<void> => {
            await executeOperation(async () => {
                const _id = context.userCollections[collection].get(serie_id);
                if (!_id) throw new Error(`Series with ID ${serie_id} not found in collection`);
                await context.userAPI.removeSerie(_id, collection);
                context.userCollections[collection].delete(serie_id);
            });
        },

        addSerie: async (serie_id: number, collection: Collection): Promise<void> => {
            await executeOperation(async () => {
                if (!context.user?._id) throw new Error('User must be logged in to add series');
                const _id: string = await context.userAPI.addSerie(context.user._id, serie_id, collection);
                context.userCollections[collection].set(serie_id, _id);
            });
        },

        deleteAll: async (collection: Collection): Promise<void> => {
            await executeOperation(async () => {
                await context.userAPI.removeAll(
                    Array.from(context.userCollections[collection].values()),
                    collection
                );
                context.userCollections[collection] = new Map();
            });
        }
    };
};