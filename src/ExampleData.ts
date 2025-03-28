import {ContactProp} from './Components/Footer/Footer';

export const title = 'TV Serieees';
export const links = [
    'top-rated',
    'on the air in the next 7 days',
    'popular'];
export const genres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation'];
export const languages= ['English', 'Spanish', 'French', 'Japanese', 'Korean', 'German', 'Italian', 'Russian'];
export const countries= ['USA', 'UK', 'France', 'Japan', 'South Korea', 'Germany', 'Canada', 'Australia'];
export const sortOptions= ['Most Popular', 'Newest First', 'Oldest First', 'Highest Rated', 'Alphabetical A-Z', 'Alphabetical Z-A'];
export const poster = {
    name: 'Stranger Things',
    path: 'https://m.media-amazon.com/images/I/81FX6up7PhL._AC_UF894,1000_QL80_.jpg'
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
export const exampleSeasonsData = [
    {
        index: 1,
        episodes: [
            {
                index: 1,
                name: 'Pilot',
                duration: 42,
                averageVote: 8.7,
                voteCount: 3420,
                overview: 'The series premiere introduces us to the main characters and sets up the central conflict of the show.',
                imagePath: 'https://example.com/s1e1.jpg'
            },
            {
                index: 2,
                name: 'The New Beginning',
                duration: 45,
                averageVote: 8.2,
                voteCount: 2980,
                overview: 'Our protagonists face their first major challenge as they navigate unfamiliar territory.',
                imagePath: 'https://example.com/s1e2.jpg'
            },
            {
                index: 3,
                name: 'Unexpected Allies',
                duration: 44,
                averageVote: 8.5,
                voteCount: 3105,
                overview: 'A surprise character appears who will change the course of the story.',
                imagePath: 'https://example.com/s1e3.jpg'
            }
        ]
    },
    {
        index: 2,
        episodes: [
            {
                index: 1,
                name: 'Aftermath',
                duration: 48,
                averageVote: 9.1,
                voteCount: 4210,
                overview: 'Season 2 begins with the fallout from the dramatic season 1 finale.',
                imagePath: 'https://example.com/s2e1.jpg'
            },
            {
                index: 2,
                name: 'Revelations',
                duration: 47,
                averageVote: 9.3,
                voteCount: 4450,
                overview: 'Shocking truths come to light that test relationships among the main characters.',
                imagePath: 'https://example.com/s2e2.jpg'
            },
            {
                index: 3,
                name: 'The Journey',
                duration: 46,
                averageVote: 8.9,
                voteCount: 3870,
                overview: 'The characters embark on a dangerous mission that will define the rest of the season.',
                imagePath: 'https://example.com/s2e3.jpg'
            }
        ]
    },
    {
        index: 3,
        episodes: [
            {
                index: 1,
                name: 'New Horizons',
                duration: 50,
                averageVote: 8.8,
                voteCount: 3650,
                overview: 'The third season introduces a new setting and expands the world of the show.',
                imagePath: 'https://example.com/s3e1.jpg'
            },
            {
                index: 2,
                name: 'Old Enemies',
                duration: 49,
                averageVote: 9.0,
                voteCount: 3920,
                overview: 'A villain from the past returns with an even more sinister plan.',
                imagePath: 'https://example.com/s3e2.jpg'
            },
            {
                index: 3,
                name: 'Alliances',
                duration: 51,
                averageVote: 9.2,
                voteCount: 4100,
                overview: 'Unlikely partnerships form as the stakes continue to rise.',
                imagePath: 'https://example.com/s3e3.jpg'
            }
        ]
    }
];

export const reviews = [
    {
        content: 'An absolutely mind-blowing series that perfectly blends nostalgia, horror, and coming-of-age drama. The young cast is phenomenal!',
        author: 'Emily Thompson'
    },
    {
        content: 'Incredible storytelling with amazing character development. Each season gets more intense and unpredictable.',
        author: 'Michael Rodriguez'
    },
    {
        content: 'A perfect mix of 80s pop culture, supernatural mystery, and heartwarming friendship. The Duffer Brothers have created a modern classic.',
        author: 'Sarah Lee'
    },
    {
        content: 'Winona Ryder and Millie Bobby Brown steal every scene. The show keeps you on the edge of your seat from start to finish.',
        author: 'David Chen'
    },
    {
        content: 'Not just another sci-fi show. It\'s a deep exploration of friendship, family, and the unknown. Absolutely brilliant!',
        author: 'Jessica Martinez'
    }
];

export const details = {
    episode_run_time: 50,
    first_air_date: '2016-07-15',
    created_by: ['The Duffer Brothers'],
    genres: ['Drama', 'Sci-Fi', 'Horror'],
    name: 'Stranger Things',
    number_of_episodes: 34,
    number_of_seasons: 4,
    original_language: 'en',
    original_name: 'Stranger Things',
    production_companies: ['Netflix', '21 Laps Entertainment'],
    production_countries: ['United States'],
    vote_average: 8.7,
    vote_count: 15234,
    cast: [
        { id: 1, actor: 'Millie Bobby Brown' },
        { id: 2, actor: 'Finn Wolfhard' },
        { id: 3, actor: 'Winona Ryder' },
        { id: 4, actor: 'David Harbour' },
        { id: 5, actor: 'Gaten Matarazzo' },
        { id: 6, actor: 'Caleb McLaughlin' }
    ]
};

export const actordata= {name: 'Tom Hanks',
    knownFor: [
        {id: 1, name: 'Forrest Gump'},
        {id: 1, name:'Saving Private Ryan'},
        {id: 1, name:'Cast Away'},
        {id: 1, name:'The Green Mile'},
        {id: 1, name:'Toy Story'}
]};