import {actorAPI, ActorTV} from './index';
import {createAPI} from '../../CreateTestAPI';

describe('Actor API: get', () => {

    describe('when response is valid', () => {

        const mockTvData: ActorTV = {
            cast: [
                { id: 1, name: 'Show 1' },
                { id: 2, name: 'Show 2' },
                { id: 3, name: 'Show 3' }
            ]
        };


        const {api, fetchMocked} = createAPI(mockTvData, actorAPI);

        it('should return the correct actor TV shows', async () => {
            const res = await api.getActorTVs('1');
            expect(res).toEqual(mockTvData);
        });

        it('should construct correct url', async()=>{
            await api.getActorTVs('10');
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('10/tv_credits'), expect.any(Object));
        });

    });

    describe('when response is invalid', () => {

        const mockTvData: ActorTV = {
            cast: [
                // @ts-expect-error We want to check invalid data
                { id: '1', name: 'Show 1' },
                { id: 2, name: 'Show 2' },
                { id: 3, name: 'Show 3' }
            ]
        };
        const {api} = createAPI(mockTvData, actorAPI);

        it('should throw an error', async () => {
            await expect(api.getActorTVs('1')).rejects.toThrow('Data is not valid: /cast/0/id (Expected number)');
        });
    });
});