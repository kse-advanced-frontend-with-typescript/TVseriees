import {initUserAPI} from '../index';
import {createFetchMocked, createFetchMockedWithBody} from '../../../fetchMocked';

describe('User API: registerUser', () => {
    const API_KEY = 'API_KEY';
    const body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    };

    const originalBtoa = global.btoa;
    beforeAll(() => {
        global.btoa = jest.fn(() => 'mocked-token');
    });

    afterAll(() => {
        global.btoa = originalBtoa;
    });

    describe('when registration was successful', () => {
        const fetchMocked = createFetchMockedWithBody(body);
        const api = initUserAPI(API_KEY, fetchMocked);

        it('post request was sent', async () => {
            await api.registerUser(body.username, body.email, body.password);
            expect(global.btoa).toHaveBeenCalledWith(expect.stringContaining(body.username));
            expect(global.btoa).toHaveBeenCalledWith(expect.stringContaining(body.email));
            expect(fetchMocked).toHaveBeenCalledWith(
                expect.stringContaining('/my-site-users'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({
                        username: body.username,
                        email: body.email,
                        password: 'password123',
                        token: 'mocked-token'
                    })
                })
            );
        });
    });

    describe('when user existed before', () => {
        it('should throw an error', async () => {
            const api = initUserAPI(API_KEY, createFetchMocked(false));
            await expect(api.registerUser('existinguser', 'existing@example.com', 'password')).rejects.toThrow('The user is already registered!');
        });
    });

});