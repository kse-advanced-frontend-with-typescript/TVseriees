import {SerieGetRequestType} from './modules/clients/series';

export type IconTopic =  'search' | 'tick' | 'star' | 'vote' | 'cross' | 'envelope' | 'call' | 'empty-star' | 'black-cross' | 'caret'
| 'heart' | 'empty-heart' | 'empty-circle' | 'circle' | 'loading' | 'error' | 'direction' | 'hidden' | 'plus';

export type ContactProp = {
    typeOfContact: 'email' | 'call',
    contact: string
}

export type LinkItem = {
    name: string,
    request_type: SerieGetRequestType | Collection
}

export type Links = {
    links: LinkItem[],
    userLinks: LinkItem[]
}
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
export type Collection = 'favorites' | 'future' | 'watched';


export const userMap: Map<string, Collection> = new Map ([
    ['star', 'future'],
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
    future: Map<number, string>,
    watched: Map<number, string>
}