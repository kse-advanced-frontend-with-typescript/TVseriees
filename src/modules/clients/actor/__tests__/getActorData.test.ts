import {ActorData, ActorTV} from '../index';
import {getActorData} from '../getActorData';
import {getImagePath} from '../../../getImagePath';

describe('getActorData', () => {
    const mockActorData: ActorData = {
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
    it('should combine actor data correctly with all data present', async () => {

        const expectedResult = {
            name: mockActorData.name,
            image: getImagePath(mockActorData.profile_path!),
            series: mockTvData.cast,
        };

        const actorPromise = Promise.resolve(mockActorData);
        const tvPromise = Promise.resolve(mockTvData);
        const result = await getActorData(actorPromise, tvPromise);
        expect(result).toEqual(expectedResult);
    });
    it('should set profile image to an empty string if it was null initially', async () => {
        const mockActorData: ActorData = {
            name: 'Actor Name',
            profile_path: null
        };
        const mockTvData: ActorTV = {cast: []};

        const expectedResult = {
            name: mockActorData.name,
            image: '',
            series: mockTvData.cast,
        };

        const actorPromise = Promise.resolve(mockActorData);
        const tvPromise = Promise.resolve(mockTvData);
        const result = await getActorData(actorPromise, tvPromise);
        expect(result).toEqual(expectedResult);
    });
    it('should throw an error is sth went wrong', async () => {
        const error = new Error('Failed to fetch images');
        const actorPromise = Promise.reject(new Error('Failed to fetch images'));
        const tvPromise = Promise.reject(new Error('Failed to fetch TV data'));
        await expect(getActorData(actorPromise, tvPromise)).rejects.toThrow(error.message.toString());
    });
});