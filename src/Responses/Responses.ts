export type SeriesDetailsResponse={
    episode_run_time: number,
    first_air_date: string,
    created_by:{
        id: number,
        credit_id: string,
        name: string,
        gender: string,
        profile_path: string

    }[],
    genres: {
        id: number,
        name: string
    }[],
    name: string,
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string,
    original_language: string,
    original_name: string,
    overview: string,
    poster_path: string,
    production_companies: {
        id: number
        logo_path: string
        name: string
        origin_country:string
    }[],
    production_countries: {
        iso_3166_1: string
        name:  string
    }[],
    vote_average: number
    vote_count: number
};


export type SeriesCast = {
    id: number;
    name: string;
    profile_path: string | null;
}[];