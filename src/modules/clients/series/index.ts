import {Static, Type} from '@sinclair/typebox';
import {convertToType} from '../../convertToType';
import {getData} from '../../getData';
import {Season} from '../../../Components/Seasons/Seasons';
import {getImagePath} from '../../getImagePath';
import {SerieDetails} from '../../../Components/SeriesDetails/SeriesDetails';
import {FilterState} from '../../../types';
import {getHeaders} from '../../getHeaders';
const getUrl = (urlPart: string)=>`https://api.themoviedb.org/3/tv/${urlPart}`;

const ImageSchema = Type.Object({
    backdrops: Type.Array(Type.Object(
        {file_path: Type.Union([Type.String(), Type.Null()])}
    ))
});

const SeriesDetailsSchema = Type.Object({
    id: Type.Number(),
    name: Type.String(),
    overview: Type.String(),
    poster_path: Type.Union([Type.String(), Type.Null()]),
    first_air_date: Type.String(),
    episode_run_time: Type.Array(Type.Number()),
    number_of_episodes: Type.Number(),
    number_of_seasons: Type.Number(),
    vote_average: Type.Number(),
    vote_count: Type.Number(),
    original_language: Type.String(),
    original_name: Type.String(),
    created_by: Type.Array(Type.Object({
        name: Type.String(),
    }) ),
    genres: Type.Array(Type.Object({
        name: Type.String()
    })),
    production_companies: Type.Array(Type.Object({
        name: Type.String(),
    })),
    production_countries: Type.Array(Type.Object({
        name: Type.String()
    }))
});

const SeasonSchema = Type.Object({
    season_number: Type.Number(),
    episodes: Type.Array(Type.Object({
        name: Type.String(),
        overview: Type.String(),
        episode_number: Type.Number(),
        runtime: Type.Union([Type.Number(), Type.Null()]),
        still_path: Type.Union([Type.String(), Type.Null()]),
        vote_average: Type.Number(),
        vote_count: Type.Number(),

    }))
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

const ReviewSchema = Type.Object({
    results: Type.Array(Type.Object({
        author: Type.String(),
        content: Type.String()
    }))
});

const CastSchema = Type.Object({
    cast: Type.Array(Type.Object({
        id: Type.Number(),
        name: Type.String(),
    }))}

);

export type SeriesResult = Static<typeof SerieCardItemResultSchema>
export type SerieGetRequestType = 'airing_today' | 'trending' | 'on_the_air' | 'popular' | 'top_rated';
export type Review = Static<typeof ReviewSchema>;
export type Cast = Static<typeof CastSchema>;
export type SeasonFromShema = Static<typeof SeasonSchema>;
export type Images = Static<typeof ImageSchema>;
export type Details = Static<typeof SeriesDetailsSchema>;
export const seriesAPI = (api_key: string, fetchAPI: typeof fetch) => {

    const get = async (page: number=1, requestType: SerieGetRequestType='trending'): Promise<SeriesResult> => {
        let url: string;
        if(requestType == 'trending')url = `https://api.themoviedb.org/3/trending/tv/day?page=${page.toString()}`;
        else url = getUrl(`${requestType}?page=${page}`);
        const data = await getData(fetchAPI, url, getHeaders(api_key, 'tmdb'));
        if (!data.page)data.page = page;
        return convertToType(data, SerieCardItemResultSchema);
    };

    const getDetails = async (id: number): Promise<SerieDetails> => {
        const fetchedSerieData = await getData(fetchAPI, getUrl(id.toString()), getHeaders(api_key, 'tmdb'));
        const serieData = convertToType(fetchedSerieData, SeriesDetailsSchema);
        const fetchedCastData = await getData(fetchAPI, getUrl(`${id}/aggregate_credits`), getHeaders(api_key, 'tmdb'));
        const cast = convertToType(fetchedCastData, CastSchema);
        return {
            episode_run_time: serieData.episode_run_time?.length ? Math.round(serieData.episode_run_time.reduce((sum, time) => sum + time, 0) / serieData.episode_run_time.length) : 'unknown',
            first_air_date: serieData.first_air_date ?? 'unknown',
            created_by: serieData.created_by.map(p=>p.name),
            genres: serieData.genres.map(g=>g.name),
            name: serieData.name,
            number_of_episodes: serieData.number_of_episodes,
            number_of_seasons: serieData.number_of_seasons,
            original_language: serieData.original_language,
            original_name: serieData.original_name,
            production_companies: serieData.production_companies.map(pc=>pc.name),
            production_countries: serieData.production_countries.map(pc=>pc.name),
            vote_average: serieData.vote_average,
            vote_count: serieData.vote_count,
            cast: cast.cast.length> 0 ? cast.cast: 'unknown',
            poster_path: serieData.poster_path? getImagePath(serieData.poster_path): '',
            overview: serieData.overview
        };
    };

    const getImages = async (id: number): Promise<string[]> => {
        const fetchedData = await getData(fetchAPI, getUrl(`${id}/images`), getHeaders(api_key, 'tmdb'));
        const imageData = convertToType(fetchedData, ImageSchema);
        return imageData.backdrops.filter(poster => poster.file_path !== null).map(poster => getImagePath(poster.file_path!));
    };

   const getReviews = async (id: number): Promise<Review> =>{
       const fetchedData = await getData(fetchAPI, getUrl(`${id}/reviews`), getHeaders(api_key, 'tmdb'));
       return convertToType(fetchedData, ReviewSchema);
   };

   const getSeason = async (serieId: number, seasonId: number): Promise<Season> => {
       const fetchedData = await getData(fetchAPI, getUrl(`${serieId}/season/${seasonId}`), getHeaders(api_key, 'tmdb'));
       const seasonData = convertToType(fetchedData, SeasonSchema);
       return {
           index: seasonData.season_number,
           episodes: seasonData.episodes.map(episode => ({
               index: episode.episode_number,
               name: episode.name,
               duration: episode.runtime ?? 'unknown',
               averageVote: episode.vote_average,
               voteCount: episode.vote_count,
               overview: episode.overview,
               imagePath: episode.still_path ? getImagePath(episode.still_path) : ''
           }))
       };
   };

   const getDynamic = async (page: number=1, filters: FilterState): Promise<SeriesResult> => {
       const params = new URLSearchParams();
       params.set('page', page.toString());
       if(filters.sortOption != '') params.set('sort_by', filters.sortOption);
       if(filters.year != '') params.set('first_air_date_year', filters.year);
       if(filters.genre != '') params.set('with_genres', filters.genre);
       if(filters.language != '') params.set('with_original_language', filters.language);
       if(filters.country != '') params.set('with_origin_country', filters.country);
       const data = await getData(fetchAPI, `https://api.themoviedb.org/3/discover/tv?${params.toString()}`, getHeaders(api_key, 'tmdb'));
       if (!data.page)data.page = page;
       return convertToType(data, SerieCardItemResultSchema);

   };

    const getByName = async (page: number=1, name: string, year?: string): Promise<SeriesResult> => {
        const params = new URLSearchParams();
        params.set('page', page.toString());
        if(name != '') params.set('query', name);
        if(year) params.set('first_air_date_year', year);
        const data = await getData(fetchAPI, `https://api.themoviedb.org/3/search/tv?${params.toString()}`, getHeaders(api_key, 'tmdb'));
        if (!data.page)data.page = page;
        return convertToType(data, SerieCardItemResultSchema);
    };

    return {
        get,
        getDetails,
        getImages,
        getReviews,
        getSeason,
        getDynamic,
        getByName
    };
};