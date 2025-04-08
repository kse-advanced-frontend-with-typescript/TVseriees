import {Static, Type } from '@sinclair/typebox';
import { convertToType } from '../../convertToType';
import { getData } from '../../getData';
import {getHeaders} from '../../getHeaders';

const CountriesSchema = Type.Array(
    Type.Object({
        iso_3166_1: Type.String(),
        english_name: Type.String()
}));
const LanguagesSchema = Type.Array(
    Type.Object({
        iso_639_1: Type.String(),
        english_name: Type.String()
    }));
const GenresSchema = Type.Object({
    genres: Type.Array(Type.Object({
        id: Type.Number(),
        name: Type.String()
    }))
});

export type Countries = Static<typeof CountriesSchema>;
export type Languages = Static<typeof LanguagesSchema>;
export type Genres = Static<typeof GenresSchema>;

export const initSearchAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const getLanguages = async (): Promise<Map<string, string>> => {
        const fetchedData = await getData(fetchAPI, 'https://api.themoviedb.org/3/configuration/languages', getHeaders(api_key, 'tmdb'));
        const languagesData = convertToType(fetchedData, LanguagesSchema);
        return new Map(languagesData.map(language=> [language.english_name, language.iso_639_1]));
    };
    const getCountries = async (): Promise<Map<string, string>> => {
        const fetchedData = await getData(fetchAPI, 'https://api.themoviedb.org/3/configuration/countries', getHeaders(api_key, 'tmdb'));
        const countriesData = convertToType(fetchedData, CountriesSchema);
        return new Map(countriesData.map(country=> [country.english_name, country.iso_3166_1]));
    };

    const getGenres = async (): Promise<Map<string, string>> => {
        const fetchedData = await getData(fetchAPI, 'https://api.themoviedb.org/3/genre/tv/list', getHeaders(api_key, 'tmdb'));
        const genresData = convertToType(fetchedData, GenresSchema);
        return new Map(genresData.genres.map(genre=> [genre.name, genre.id.toString()]));
    };

    return {
       getCountries, getGenres, getLanguages
    };
};