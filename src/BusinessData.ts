import {Collection, ContactProp, Links} from './types';

export const links: Links = {
    links:[
        {request_type: 'top_rated', name: 'top-rated'},
        {request_type: 'popular', name:  'popular'},
        {request_type: 'on_the_air', name:  'on the air'},
        {request_type: 'airing_today', name: 'airing today'}
    ],
    userLinks:[
        {request_type: 'favorites', name: 'favorites'},
        {request_type: 'future', name:  'want to watch'},
        {request_type: 'watched', name:  'already watched'},
    ]
};

export const myContacts: ContactProp[] = [
    { typeOfContact: 'email', contact: 'margarit.fil@gmail.com' },
    { typeOfContact: 'email', contact: 'mfilipovych@kse.org.ua' },
    { typeOfContact: 'call', contact: '+38 097 151 9327' },

];

export const SortOptions: Map<string, string> = new Map([
    ['first air date (from oldest)', 'first_air_date.asc'],
    ['first air date (from newest)', 'first_air_date.desc'],
    ['name (A-Z)', 'name.asc'],
    ['name (Z-A)', 'name.desc'],
    ['popularity (low to high)', 'popularity.asc'],
    ['popularity (high to low)', 'popularity.desc'],
    ['rating (low to high)', 'vote_average.asc'],
    ['rating (high to low)', 'vote_average.desc'],
    ['vote count (low to high)', 'vote_count.asc'],
    ['vote count (high to low)', 'vote_count.desc']
]);

export const UserPageTitles: Map<Collection, string> = new Map([
    ['watched', 'You\'ve already seen these:'],
    ['favorites', 'These are your favourite:'],
    ['future', 'You should definitely consider watching these:'],
]);

export const EmptyTitles: Map<Collection, string> = new Map([
    ['watched', 'You haven\'t seen anything yet:(('],
    ['favorites', 'It seems like you don\'t consider any TV serie as your favourite:('],
    ['future', 'You haven\'t chosen anything to watch tonight:('],
]);