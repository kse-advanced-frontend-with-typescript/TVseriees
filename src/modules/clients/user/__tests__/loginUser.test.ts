import {userAPI, User, UserModel} from '../index';
import {createFetchMockedWithBody} from "../../../fetchMocked";
import bcrypt from "bcrypt";

describe('User API: loginUser', () => {
    const API_KEY = 'API_KEY';

    describe('when user exists ', () => {
        const password = 'corrent';
        const body: Array<UserModel>= [{
            _id: '1234455',
            username: 'username',
            email: 'email',
            token: 'token',
            hashPassword: bcrypt.hashSync(password, 10)
        }];
        const expectedResponse: User = {
            _id: '1234455',
            username: 'username',
            email: 'email',
            token: 'token'
        };
        const fetchMocked = createFetchMockedWithBody(body);
        const api = userAPI(API_KEY, fetchMocked);

        it('and password is correct, should return user-related info', async () => {
            const response = await api.loginUser('email', password);
            expect(fetchMocked).toBeCalledWith(
                expect.stringContaining('my-site-users')&&
                expect.stringContaining((`q=${encodeURIComponent(
                    JSON.stringify({ email: 'email'}))}`)),
                expect.objectContaining({
                    headers: expect.any(Headers)
                })
            );
            expect(response).toEqual(expectedResponse);
        });
        it('and password is incorrect, should throw an error', async () => {
            await expect(api.loginUser('email', 'hello')).rejects.toThrow('Login or password is incorrect!');
        });
    });

    describe('when user does not exist', () => {
        const body: UserModel[] = [];
        it('should return users token', async () => {
            const api = userAPI(API_KEY, createFetchMockedWithBody(body));
            await expect(api.loginUser('some', 'corrent')).rejects.toThrow('Login or password is incorrect!');
        });
    });


});