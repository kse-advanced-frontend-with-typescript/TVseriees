import {UserSerieItems} from "./modules/clients/user";

export type IconTopic =  'search' | 'tick' | 'star' | 'vote' | 'cross' | 'envelope' | 'call' | 'empty-star' | 'black-cross' | 'caret'
| 'heart' | 'empty-heart' | 'empty-circle' | 'circle' | 'loading' | 'error' | 'direction' | 'hidden' | 'plus';

export type PicturesProps = {
    name: string,
    paths: string[]
}

export type FilterState = {
    genre: string,
    language: string,
    country: string,
    sortOption: string,
    year: string,
    name: string
}

export type ConfigurationData = {
    countries: Map<string, string>,
    languages: Map<string, string>,
    genres: Map<string, string>,
    code_languages: Map<string, string>
}
export type Collection = 'favorites' | 'towatch' | 'watched';


export const userMap: Map<string, Collection> = new Map ([
    ['star', 'towatch'],
    ['heart', 'favorites'],
    ['circle', 'watched']
]);
export type Serie = {
    id: number,
    name: string,
    poster_path: string | null
}

export type UserCollections = {
    favorites: Map<number, string>,
    towatch: Map<number, string>,
    watched: Map<number, string>
}