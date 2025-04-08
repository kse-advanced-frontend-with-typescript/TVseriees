import {userAPI} from '../index';
import {createFetchMocked, createFetchMockedWithBody} from '../../../fetchMocked';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('User API: registerUser', () => {
    const API_KEY = 'API_KEY';
    const body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
    };

    describe('when registration was successful', () => {
        const fetchMocked = createFetchMockedWithBody(body);
        const api = userAPI(API_KEY, fetchMocked);

        beforeEach(async () => {
            (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');
            (jwt.sign as jest.Mock).mockReturnValue('token');
            await api.registerUser(body.username, body.email, body.password);
        });

        it('password was encrypted', () => {
            expect(bcrypt.hash).toHaveBeenCalledWith(body.password, 10);
        });

        it('token was generated', () => {
            expect(jwt.sign).toHaveBeenCalled();
            const [payload] = (jwt.sign as jest.Mock).mock.calls[0];
            expect(payload.username).toBe(body.username);
            expect(payload.email).toBe(body.email);
            expect(typeof payload.iat).toBe('number');
        });

        it('post request was sent', () => {
            expect(fetchMocked).toHaveBeenCalledWith(
                expect.stringContaining('/my-site-users'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({
                        username: body.username,
                        email: body.email,
                        hashedPassword: 'hashed-password',
                        token: 'token'
                    })
                })
            );
        });
    });

    describe('when user existed before', () => {
        it('should throw an error', async () => {
            const api = userAPI(API_KEY, createFetchMocked(false));
            await expect(api.registerUser('existinguser', 'existing@example.com', 'password')).rejects.toThrow('The user is already registered!');
        });
    });
});