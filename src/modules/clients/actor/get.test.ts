import {actorAPI, ActorResponse} from './index';
import {getImagePath} from '../../getImagePath';

describe ('Actor API: get', ()=>{
    const API_KEY = 'API_KEY';
    describe('when response is valid', ()=>{
        const mockActorData = {
            name: 'Actor Name',
            profile_path: '/path/to/profile.jpg'
        };

        const mockTvData = {
            cast: [
                { id: 1, name: 'Show 1' },
                { id: 2, name: 'Show 2' },
                { id: 3, name: 'Show 3' }
            ]
        };

        const expectedResult = {
            name: 'Actor Name',
            image: getImagePath('/path/to/profile.jpg'),
            series: mockTvData.cast
        };

        const fetchMocked = jest.fn().mockImplementation((url: string) => {
            if (url.includes('/tv_credits')) {
                return new Response(JSON.stringify(mockTvData), {
                    status: 200,
                });

            } else  return new Response(JSON.stringify(mockActorData), {
                status: 200,
            });
        });


        const api = actorAPI(API_KEY, fetchMocked);
        it('should return the result', async ()=>{
            const res = await api.get('1');
             expect(res).toEqual(expectedResult);


        });

    });


});


