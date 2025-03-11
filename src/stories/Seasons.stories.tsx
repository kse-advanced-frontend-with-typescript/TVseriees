import React from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {Seasons} from '../Components/Seasons/Seasons';

const exampleSeasonsData = [
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
const meta : Meta<typeof  Seasons>={
    component: Seasons,
    title: 'Seasons',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    render: ()=>{
        return <Seasons seasons={exampleSeasonsData}/>;
    }
};