import {ContactProp, Links} from './Components/Footer/Footer';

export const links: Links = {
    links:[
        {request_type: 'top_rated', name:  'top-rated'},
        {request_type: 'popular', name:  'popular'},
        {request_type: 'on_the_air', name:  'on the air'},
        {request_type: 'airing_today', name: 'airing today'}
    ],
    userLinks:['favorites', 'to-watch', 'watched']
};

export const myContacts: ContactProp[] = [
    { typeOfContact: 'email', contact: 'margarit.fil@gmail.com' },
    { typeOfContact: 'email', contact: 'mfilipovych@kse.org.ua' },
    { typeOfContact: 'call', contact: '+38 097 151 9327' },

];

export const actorData = {name: 'Tom Hanks',
    knownFor: [
        {id: 1, name: 'Forrest Gump'},
        {id: 1, name:'Saving Private Ryan'},
        {id: 1, name:'Cast Away'},
        {id: 1, name:'The Green Mile'},
        {id: 1, name:'Toy Story'}
]};

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