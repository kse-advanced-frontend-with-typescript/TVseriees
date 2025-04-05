import { Type } from '@sinclair/typebox';
import { convertToType } from '../../convertToType';
import { getData } from '../../getData';

const ConfigurationSchema = Type.Array(
    Type.Object({
    english_name: Type.String()
}));
const GenresSchema = Type.Object({
    genres: Type.Array(Type.Object({
        name: Type.String()
    }))
});

export type Search = {
    genres: string[],
    languages: string[],
    countries: string[]
};

export const searchAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const get = async (what: 'countries' | 'languages'): Promise<string[]> => {
        const fetchedData = await getData(api_key, fetchAPI, `https://api.themoviedb.org/3/configuration/${what}`);
        const data = convertToType(fetchedData, ConfigurationSchema);
        return data.map(d => d.english_name);
    };

    const getGenres = async (): Promise<string[]> => {
        const fetchedData = await getData(api_key, fetchAPI, 'https://api.themoviedb.org/3/genre/tv/list');
        const genresData = convertToType(fetchedData, GenresSchema);
        return genresData.genres.map(g=>g.name);
    };

    return {
       get, getGenres
    };
};