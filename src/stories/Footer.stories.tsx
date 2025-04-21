import type {Meta, StoryObj} from '@storybook/react';
import {Footer} from '../Components/Footer/Footer';
import {myContacts} from '../BusinessData';

const meta : Meta<typeof  Footer>={
    component: Footer,
    title: 'Footer',

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args:{
        links: {
            links: [
                { name: 'Trending', request_type: 'trending' },
                { name: 'Popular Shows', request_type: 'popular' },
                { name: 'Top Rated', request_type: 'top_rated' },
                { name: 'Airing Today', request_type: 'airing_today' },
                { name: 'On The Air', request_type: 'on_the_air' }
            ],
            userLinks: [
                { name: 'My Favorites', request_type: 'favorites' },
                { name: 'Watch Later', request_type: 'future' },
                { name: 'Already Watched', request_type: 'watched' }
            ]
        },
        contacts: myContacts,
        authorized: false
    }
};
