import type {Meta, StoryObj} from '@storybook/react';

import {SearchField} from '../Components/SearchField/SearchField';

const meta : Meta<typeof  SearchField>={
    component: SearchField,
    title: 'SearchField',

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args:{
        genres: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Animation'],
        languages: ['English', 'Spanish', 'French', 'Japanese', 'Korean', 'German', 'Italian', 'Russian'],
        countries: ['USA', 'UK', 'France', 'Japan', 'South Korea', 'Germany', 'Canada', 'Australia'],
        sortOptions: ['Most Popular', 'Newest First', 'Oldest First', 'Highest Rated', 'Alphabetical A-Z', 'Alphabetical Z-A']

    }
};