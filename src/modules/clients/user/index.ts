import {Static, Type} from '@sinclair/typebox';
const base_url: string = 'https://favourites-36a5.restdb.io/rest/';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {convertToType} from '../../convertToType';
import {getData} from '../../getData';
import {getHeaders} from '../../getHeaders';

const UserItemSchema = Type.Object({
    _id: Type.String(),
    username: Type.String(),
    email: Type.String(),
    token: Type.String(),
    hashPassword: Type.String()
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

export type Serie = Static<typeof SeriesShema>;
export type SeriesResult = Static<typeof SeriesResultSchema>;
const UserSchema = Type.Array(UserItemSchema);
type Collection = 'favorites' | 'to-watch' | 'watched';
export type UserModel = Static<typeof UserItemSchema>;
export type User = Omit<UserModel, 'hashPassword'>;

export const userAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const SESSION_KEY = 'sessionKey';

    const registerUser = async (username: string, email: string, password: string)=>{
        const headers = getHeaders(api_key, 'restdbio');
        const hashedPassword = await bcrypt.hash(password, 10);
        const token = jwt.sign(
            {
                username: username,
                email: email,
                iat: Date.now()
           },
            process.env.SECRET_KEY!
        );
        const response = await fetchAPI(`${base_url}/my-site-users`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                hashedPassword,
                token
            }),
            headers
        });
        if(!response.ok)throw new Error('The user is already registered!');
    };

    const loginUser = async (email: string, password: string): Promise<User> => {
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({email: email}));
        const url = `${base_url}/my-site-users?${params.toString()}`;
        const data = await getData(fetchAPI, url, getHeaders(api_key, 'restdbio'));
        const user =  convertToType(data, UserSchema);
        if(user.length <= 0 || !bcrypt.compareSync(password, user[0].hashPassword))throw new Error('Login or password is incorrect!');
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

    const getSeries = async (skip: number = 0, perPage: number = 1000, id: string, collection: Collection): Promise<Array<number>> =>{
        const params = new URLSearchParams();
        params.set('q', JSON.stringify({user_id: id}));
        params.set('totals', 'true');
        params.set('skip', skip.toString());
        params.set('max', perPage.toString());
        const url = `${base_url}/${collection}?${params.toString()}`;
        const data = await getData(fetchAPI, url, getHeaders(api_key, 'restdbio'));
        const convertedData = convertToType(data, SeriesResultSchema);
        return convertedData.data.map(item => item.serie_id);
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
