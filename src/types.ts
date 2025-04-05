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
