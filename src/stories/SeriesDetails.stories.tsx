import type { Meta, StoryObj } from '@storybook/react';
import {SeriesDetails} from '../Components/SeriesDetails/SeriesDetails';

const meta: Meta<typeof SeriesDetails> = {
    component: SeriesDetails,
    title: 'SeriesDetails',
};

export default meta;

type Story = StoryObj<typeof SeriesDetails>;

export const StrangerThings: Story = {
    args: {
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
            { id: 1, name: 'Millie Bobby Brown' },
            { id: 2, name: 'Finn Wolfhard' },
            { id: 3, name: 'Winona Ryder' },
            { id: 4, name: 'David Harbour' },
            { id: 5, name: 'Gaten Matarazzo' },
            { id: 6, name: 'Caleb McLaughlin' }
        ]
    }
};
