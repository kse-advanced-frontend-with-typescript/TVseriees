import type {Meta, StoryObj} from '@storybook/react';

import {Poster} from '../Components/Poster/Poster';

const meta : Meta<typeof  Poster>={
    component: Poster,
    title: 'Poster',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args: {
        name: 'Stranger Things',
        path: 'https://m.media-amazon.com/images/I/81FX6up7PhL._AC_UF894,1000_QL80_.jpg'
    }
};