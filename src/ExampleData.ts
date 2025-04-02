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

export const seriesData = [
    {   id: 1,
        imagePath: '/images/breaking-bad.jpg',
        name: 'Breaking Bad',
    },
    {
        id: 1,
        imagePath: '/images/stranger-things.jpg',
        name: 'Stranger Things',
    },
    {
        id: 1,
        imagePath: '/images/the-crown.jpg',
        name: 'The Crown',
    },
    {
        id: 1,
        imagePath: '/images/the-mandalorian.jpg',
        name: 'The Mandalorian',
    }
];

export const myContacts: ContactProp[] = [
    { typeOfContact: 'email', contact: 'margarit.fil@gmail.com' },
    { typeOfContact: 'call', contact: '+38 097 151 9327' }
];



export const actorData = {name: 'Tom Hanks',
    knownFor: [
        {id: 1, name: 'Forrest Gump'},
        {id: 1, name:'Saving Private Ryan'},
        {id: 1, name:'Cast Away'},
        {id: 1, name:'The Green Mile'},
        {id: 1, name:'Toy Story'}
]};

export const SortOptions: Record<string, string> = {
    'first_air_date.asc': 'first air date (from oldest)',
    'first_air_date.desc': 'first air date (from newest)',
    'name.asc': 'name (A-Z)',
    'name.desc': 'name (Z-A)',
    'popularity.asc': 'popularity (low to high)',
    'popularity.desc': 'popularity (high to low)',
    'vote_average.asc': 'rating (low to high)',
    'vote_average.desc': 'rating (high to low)',
    'vote_count.asc': 'vote count (low to high)',
    'vote_count.desc': 'vote count (high to low)'
};