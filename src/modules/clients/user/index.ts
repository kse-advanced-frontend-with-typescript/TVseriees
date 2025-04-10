import {Static, Type} from '@sinclair/typebox';
import {convertToType} from '../../convertToType';
import {getData} from '../../getData';
import {getHeaders} from '../../getHeaders';
import {Collection} from '../../../types';
const base_url: string = 'https://mapstorage-7e78.restdb.io/rest';
const UserItemSchema = Type.Object({
    _id: Type.String(),
    username: Type.String(),
    email: Type.String(),
    token: Type.String(),
    password: Type.String()
});
const SeriesShema = Type.Array(Type.Object({
    serie_id: Type.Number(),
}));

const SeriesResultSchema = Type.Object({
    data: SeriesShema,
    totals: Type.Object({
        total: Type.Number(),
        count: Type.Number(),
        skip: Type.Number(),
        max: Type.Number(),
    })
});

export type SeriesResult = Static<typeof SeriesResultSchema>;
const UserSchema = Type.Array(UserItemSchema);
export type UserModel = Static<typeof UserItemSchema>;
export type User = Omit<UserModel, 'password'>;

export const initUserAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const SESSION_KEY = 'sessionKey';

    const registerUser = async (username: string, email: string, password: string)=>{
        const headers = getHeaders(api_key, 'restdbio');

        const token = btoa(JSON.stringify({
            username: username,
            email: email,
            iat: Date.now()
        }));

        const response = await fetchAPI(`${base_url}/my-site-users`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password: password,
                token
            }),
            headers
        });
        if(!response.ok) throw new Error('The user is already registered!');
    };

    const getUser = async (params: URLSearchParams): Promise<UserModel[]>=>{
        const url = `${base_url}/my-site-users?${params.toString()}`;
        const data = await getData(fetchAPI, url, getHeaders(api_key, 'restdbio'));
        const user = convertToType(data, UserSchema);
        console.log('register request sent');

        return user;
    };

    const loginUser = async (email: string, password: string): Promise<User> => {
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({email: email}));
        const user = await getUser(params);
        if(user.length <= 0 || password != user[0].password)
            throw new Error('Login or password is incorrect!');
        return {
            username: user[0].username,
            email: user[0].email,
            token: user[0].token,
            _id: user[0]._id
        };
    };

    const getUserByToken = async (token: string): Promise<User> => {
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({token: token}));
        const user = await getUser(params);
        console.log('register request sent');

        if (user.length <= 0) throw new Error('User does not exist!');
        return {
            username: user[0].username,
            email: user[0].email,
            token: user[0].token,
            _id: user[0]._id
        };
    };

    const restoreToken = (): string | null => {
        return window.localStorage.getItem(SESSION_KEY);
    };

    const cleanToken = (): void => {
        window.localStorage.removeItem(SESSION_KEY);
    };

    const saveToken = (token: string): void => {
        window.localStorage.setItem(SESSION_KEY, token);
    };

    const getSeries = async (id: string, collection: Collection, skip?: number, perPage?: number): Promise<SeriesResult> =>{
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({user_id: id}));
        params.set('totals', 'true');
        if(skip)params.set('skip', skip.toString());
        if(perPage)params.set('max', perPage.toString());
        const url = `${base_url}/${collection}?${params.toString()}`;
        const data = await getData(fetchAPI, url, getHeaders(api_key, 'restdbio'));
       return convertToType(data, SeriesResultSchema);
    };

    const removeSerie = async (id: string, serieId: number, collection: Collection) =>{
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({
            user_id: id,
            serie_id: serieId
        }));
        const url = `${base_url}${collection}?${params.toString()}`;
        const headers = getHeaders(api_key, 'restdbio');
        const response = await fetchAPI(url, {
            method: 'DELETE',
            headers
        });
        if(!response.ok) throw new Error('Error removing data!');
    };

    const addSerie = async (user_id: string, serie_id: number, collection: Collection) =>{
        const headers = getHeaders(api_key, 'restdbio');
        const response = await fetchAPI(`${base_url}/${collection}`, {
            method: 'POST',
            body: JSON.stringify({
                user_id,
                serie_id
            }),
            headers
        });
        if(!response.ok) throw new Error('Error adding data!');
    };

    const removeAll = async (id: string, collection: Collection) =>{
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({user_id: id}));
        const url = `${base_url}${collection}?${params.toString()}`;
        const headers = getHeaders(api_key, 'restdbio');
        const response = await fetchAPI(url, {
            method: 'DELETE',
            headers
        });
        if(!response.ok) throw new Error('Error removing data!');
    };

    return {
        getUserByToken,
        loginUser,
        registerUser,
        restoreToken,
        saveToken,
        cleanToken,
        addSerie,
        removeAll,
        removeSerie,
        getSeries
    };
};