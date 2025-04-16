import {initUserAPI, User, UserModel} from '../index';
import {createFetchMockedWithBody} from '../../../fetchMocked';

describe('User API: getUserByToken', () => {
    const API_KEY = 'API_KEY';

    describe('when user exists ', () => {
        const body: Array<UserModel>= [{
            _id: '1234455',
            username: 'username',
            email: 'email',
            token: 'token',
            password: 'hash'
        }];
        const expectedResponse: User = {
            _id: '1234455',
            username: 'username',
            email: 'email',
            token: 'token'
        };
        const fetchMocked = createFetchMockedWithBody(body);
        const api = initUserAPI(API_KEY, fetchMocked);

        it('and password is correct, should return user-related info', async () => {
            const response = await api.getUserByToken('token');
            expect(fetchMocked).toBeCalledWith(
                expect.stringContaining('my-site-users')&&
                expect.stringContaining((`q=${encodeURIComponent(
                    JSON.stringify({ token: 'token'}))}`)),
                expect.objectContaining({
                    headers: expect.any(Headers)
                })
            );
            expect(response).toEqual(expectedResponse);
        });

    });

    describe('when user does not exist', () => {
        const body: UserModel[] = [];
        it('should return users token', async () => {
            const api = initUserAPI(API_KEY, createFetchMockedWithBody(body));
            await expect(api.getUserByToken('some')).rejects.toThrow('User does not exist!');
        });
    });


});