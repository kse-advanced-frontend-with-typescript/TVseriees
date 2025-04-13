import {SerieGetRequestType} from './modules/clients/series';

export type IconTopic =  'search' | 'tick' | 'star' | 'vote'
    | 'cross' | 'envelope' | 'call' | 'empty-star'
    | 'black-cross' | 'caret' | 'heart' | 'empty-heart'
    | 'empty-circle' | 'circle' | 'loading' | 'error'
    | 'direction' | 'hidden' | 'plus';

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

export type State = {
    loading: boolean,
    error: boolean
}

export type StateWithPagination = State & {
    pageToFetch: number,
    currentPage: number
}

export type ActorResponse = {
    name: string;
    image: string;
    series: Array<{ id: number; name: string }>;
};
type SeriesCardBaseProps = {
    imagePath: string;
    name: string,
    id: number
    onDelete: (serie_id: number, collection: Collection) => void;
};

export type SeriesCardProps =
    (SeriesCardBaseProps & {
        topicOfCard: 'usual'
        onAdd: (serie_id: number, collection: Collection) => void;
    }) |
    (SeriesCardBaseProps & {
        topicOfCard: Collection
        voteCount: number
        averageVote: number
    });