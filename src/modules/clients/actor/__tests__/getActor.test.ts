import {ActorData, initActorAPI} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';

describe('Actor API: get', () => {
    const API_KEY = 'API_KEY';
    describe('when response is valid', () => {

        const mockActorData: ActorData = {
            name: 'Actor Name',
            profile_path: '/path/to/profile.jpg'
        };

        const fetchMocked = createFetchMockedWithBody(mockActorData);
        const api = initActorAPI(API_KEY, fetchMocked);

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

        const mockActorData: ActorData = {
            // @ts-expect-error We want to check invalid data
            name: null,
            // @ts-expect-error We want to check invalid data
            profile_path: 5555
        };
        const api = initActorAPI(API_KEY, createFetchMockedWithBody(mockActorData));
        it('should throw an error', async () => {
            await expect(api.getActor('1')).rejects.toThrow('Data is not valid: /name (Expected string)');
        });
    });
});