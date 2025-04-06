import {actorAPI, ActorImages} from './index';
import {createAPI} from '../../CreateTestAPI';

describe('Actor API: getActor', () => {

    describe('when response is valid', () => {

        const mockImagesData: ActorImages = {
            id: 1,
            profiles: [
                { file_path: '/path/to/image1.jpg' },
                { file_path: '/path/to/image2.jpg' },
                { file_path: null },
                { file_path: '/path/to/image3.jpg' }
            ]
        };


        const {api, fetchMocked} = createAPI(mockImagesData, actorAPI);

        it('should return the correct actor images', async () => {
            const res = await api.getActorImages('1');
            expect(res).toEqual(mockImagesData);
        });

        it('should construct correct url', async()=>{
            await api.getActorImages('10');
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('10/images'), expect.any(Object));
        });

    });

    describe('when response is invalid', () => {

        const mockImagesData: ActorImages = {
            id: 1,
            profiles: [
                // @ts-expect-error We want to check invalid data
                { file_path: 33333 },
                // @ts-expect-error We want to check invalid data
                { file_path: 666 },
                { file_path: null },
                { file_path: '/path/to/image3.jpg' }
            ]
        };

        const {api} = createAPI(mockImagesData, actorAPI);

        it('should throw an error', async () => {
            await expect(api.getActorImages('1')).rejects.toThrow('Data is not valid: /profiles/0/file_path (Expected union value)');
        });
    });
});