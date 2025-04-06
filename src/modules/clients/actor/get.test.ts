import {Actor, actorAPI, ActorTV, ActorImages} from './index';
import {getImagePath} from '../../getImagePath';

describe('Actor API: get', () => {
    const API_KEY = 'API_KEY';

    const createAPI = (actorData: Actor, tvData: ActorTV, imagesData: ActorImages) => {
        const fetchMocked = jest.fn().mockImplementation((url: string) => {
            if (url.includes('/tv_credits')) {
                return Promise.resolve(new Response(JSON.stringify(tvData), {
                    status: 200,
                }));
            } else if (url.includes('/images')) {
                return Promise.resolve(new Response(JSON.stringify(imagesData), {
                    status: 200,
                }));
            } else {
                return Promise.resolve(new Response(JSON.stringify(actorData), {
                    status: 200,
                }));
            }
        });
        return {
            api: actorAPI(API_KEY, fetchMocked),
            fetchMocked
        };
    };

    describe('when response is valid', () => {
        const mockActorData: Actor = {
            name: 'Actor Name',
            profile_path: '/path/to/profile.jpg'
        };

        const mockTvData: ActorTV = {
            cast: [
                { id: 1, name: 'Show 1' },
                { id: 2, name: 'Show 2' },
                { id: 3, name: 'Show 3' }
            ]
        };

        const mockImagesData: ActorImages = {
            id: 1,
            profiles: [
                { file_path: '/path/to/image1.jpg' },
                { file_path: '/path/to/image2.jpg' },
                { file_path: null },
                { file_path: '/path/to/image3.jpg' }
            ]
        };

        const expectedResult = {
            name: mockActorData.name,
            image: getImagePath(mockActorData.profile_path!),
            series: mockTvData.cast,
            images: mockImagesData.profiles
                .filter(profile => profile.file_path)
                .map(profile => getImagePath(profile.file_path!))
        };

        const {api, fetchMocked} = createAPI(mockActorData, mockTvData, mockImagesData);

        it('should return the correct actor data with TV shows and images', async () => {
            const res = await api.get('1');
            expect(res).toEqual(expectedResult);
        });

        it('should construct correct url', async()=>{
            await api.get('10');
            expect(fetchMocked).toBeCalledWith(expect.stringContaining('10'), expect.any(Object));
        });

    });

    describe('when response is invalid', () => {
        const mockActorData = {
            name: null,
            profile_path: 5555
        };

        const mockTvData = {
            cast: [
                { id: '1', name: 'Show 1' },
                { id: 2, name: 'Show 2' },
                { id: 3, name: 'Show 3' }
            ]
        };

        const mockImagesData = {
            id: 1,
            profiles: [
                { file_path: 33333 },
                { file_path: 666 },
                { file_path: null },
                { file_path: '/path/to/image3.jpg' }
            ]
        };

        // @ts-expect-error We want to check invalid data
        const {api} = createAPI(mockActorData, mockTvData, mockImagesData);

        it('should throw an error', async () => {
            await expect(api.get('1')).rejects.toThrow('Data is not valid: /name (Expected string)');
        });
    });
});