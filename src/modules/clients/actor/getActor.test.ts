import {Actor, actorAPI, ActorTV} from './index';
import {createAPI} from '../../CreateTestAPI';

describe('Actor API: get', () => {

    describe('when response is valid', () => {

        const mockActorData: Actor = {
            name: 'Actor Name',
            profile_path: '/path/to/profile.jpg'
        };

        const {api, fetchMocked} = createAPI(mockActorData, actorAPI);

        it('should return the correct actor data', async () => {
            const res = await api.getActor('1');
            expect(res).toEqual(mockActorData);
        });

        it('should construct correct url', async()=>{
            await api.getActor('10');
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('10'), expect.any(Object));
        });

    });

    describe('when response is invalid', () => {

        const mockActorData: Actor = {
            // @ts-expect-error We want to check invalid data
            name: null,
            // @ts-expect-error We want to check invalid data
            profile_path: 5555
        };
        const {api} = createAPI(mockActorData, actorAPI);

        it('should throw an error', async () => {
            await expect(api.getActor('1')).rejects.toThrow('Data is not valid: /name (Expected string)');
        });
    });
});