import type {Meta, StoryObj} from '@storybook/react';
import {Actor} from '../Components/Actor/Actor';
import {actorData} from '../ExampleData';

const meta : Meta<typeof  Actor>={
    component: Actor,
    title: 'Actor',

};

export default meta;
type Story = StoryObj<typeof meta>

export const Primary: Story ={
    args:actorData
};