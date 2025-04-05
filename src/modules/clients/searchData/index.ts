import {Static, Type } from '@sinclair/typebox';
import { convertToType } from '../../convertToType';
import { getData } from '../../getData';

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

export const searchAPI = (api_key: string, fetchAPI: typeof fetch) => {
    const getLanguages = async (): Promise<Map<string, string>> => {
        const fetchedData = await getData(api_key, fetchAPI, 'https://api.themoviedb.org/3/configuration/languages');
        const languagesData = convertToType(fetchedData, LanguagesSchema);
        return new Map(languagesData.map(language=> [language.english_name, language.iso_639_1]));
    };
    const getCountries = async (): Promise<Map<string, string>> => {
        const fetchedData = await getData(api_key, fetchAPI, 'https://api.themoviedb.org/3/configuration/countries');
        const countriesData = convertToType(fetchedData, CountriesSchema);
        return new Map(countriesData.map(country=> [country.english_name, country.iso_3166_1]));
    };

    const getGenres = async (): Promise<Map<string, string>> => {
        const fetchedData = await getData(api_key, fetchAPI, 'https://api.themoviedb.org/3/genre/tv/list');
        const genresData = convertToType(fetchedData, GenresSchema);
        return new Map(genresData.genres.map(genre=> [genre.name, genre.id.toString()]));
    };

    return {
       getCountries, getGenres, getLanguages
    };
};