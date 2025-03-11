import type {Meta, StoryObj} from '@storybook/react';

import {Actor} from '../Components/Actor/Actor';

const meta : Meta<typeof  Actor>={
    component: Actor,
    title: 'Actor',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story ={
    args:{
        name: 'Tom Hanks',
        knownFor: [
            'Forrest Gump',
            'Saving Private Ryan',
            'Cast Away',
            'The Green Mile',
            'Toy Story'
        ]
    }
};