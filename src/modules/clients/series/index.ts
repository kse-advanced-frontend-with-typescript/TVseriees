import {Static, Type} from '@sinclair/typebox';
import {TypeCompiler} from '@sinclair/typebox/compiler';
import {schemaErrorToError} from '../../schemaErrorToError';
import {convertToType} from '../../convertToType';
import {poster} from "../../../ExampleData";
const baseImageUrl = 'https://image.tmdb.org/t/p/';

const getHeaders = (api_key: string): Headers =>{
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('cache-control', 'no-cache');
    headers.set('Authorization', `Bearer ${api_key}`);
    return headers;
};

const ImageSchema = Type.Object({
    posters: Type.Array(Type.Object(
        {file_path: Type.Union([Type.String(), Type.Null()])}
    ))
});
const SerieDetailsSchema = Type.Object({
    poster_path: Type.Union([Type.String(), Type.Null()]),
    episode_run_time: Type.Array(Type.Number()),
    first_air_date: Type.String(),
    created_by: Type.Array(Type.Object({name:Type.String()})),
    genres: Type.Array(Type.Object({name:Type.String()})),
    name: Type.String(),
    number_of_episodes: Type.Number(),
    number_of_seasons: Type.Number(),
    original_language:Type.String(),
    original_name: Type.String(),
    production_companies: Type.Array(Type.Object({name:Type.String()})),
    production_countries: Type.Array(Type.Object({name:Type.String()})),
    vote_average:Type.Number(),
    vote_count: Type.Number(),
    id: Type.Number(),
    overview: Type.String()
});

const SerieCardItemResultSchema = Type.Object({
    page: Type.Number(),
    results: Type.Array(Type.Object({
            id: Type.Number(),
            name: Type.String(),
            poster_path: Type.Union([Type.String(), Type.Null()])
        })),
    total_pages: Type.Number(),
    total_results: Type.Number()
});
export type SerieDetails = Static<typeof SerieDetailsSchema>
export type SeriesResult = Static<typeof SerieCardItemResultSchema>

export const seriesAPI = (api_key: string, fetchAPI: typeof fetch) => {

    const get = async (page: number = 1): Promise<SeriesResult> => {

        const response = await fetchAPI(`https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page.toString()}`, {
            headers: getHeaders(api_key)
        });
        if (!response.ok) throw Error(`Could not fetch movies: ${response.statusText}`);
        const data = await response.json();
        return convertToType(data, SerieCardItemResultSchema);
    };

    const getDetails = async (id: number): Promise<SerieDetails> => {
        const response = await fetchAPI(`https://api.themoviedb.org/3/tv/${id}`, {
            headers: getHeaders(api_key)
        });
        if (!response.ok) throw Error(`Could not fetch map item: ${response.statusText}`);
        const data = await response.json();
        return convertToType(data, SerieDetailsSchema);
    };

    const getImages = async (id: number): Promise<string[]> => {
        const response = await fetchAPI(`https://api.themoviedb.org/3/tv/${id}/image`, {
            headers: getHeaders(api_key)
        });
        if (!response.ok) throw Error(`Could not fetch map item: ${response.statusText}`);
        const data = await response.json();
        const imageData = convertToType(data, ImageSchema);
        return imageData.posters.filter(poster=> poster.file_path != null).map(poster =>`https://image.tmdb.org/t/p/original${poster.file_path}`);
    };

    // const getReviews = async (id: number): Promise<string[]> =>{
    //
    // };
    return {
        get,
        getDetails,
        getImages
    };
};