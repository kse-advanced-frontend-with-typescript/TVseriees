import type {Meta, StoryObj} from '@storybook/react';

import {Actor} from '../Components/Actor/Actor';

const meta : Meta<typeof  Actor>={
    component: Actor,
    title: 'Actor',

};

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story ={
    args:{
        name: 'Tom Hanks',
        knownFor: [
            {id: 1, name: 'Forrest Gump'},
            {id: 1, name:'Saving Private Ryan'},
            {id: 1, name:'Cast Away'},
            {id: 1, name:'The Green Mile'},
            {id: 1, name:'Toy Story'}
        ]
    }
};