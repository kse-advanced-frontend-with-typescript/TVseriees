import type {Meta, StoryObj} from '@storybook/react';


import {MiniButton} from '../Components/MiniButton/MiniButton';

const meta : Meta<typeof  MiniButton>={
    component: MiniButton,
    title: 'MiniButton',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Search: Story ={

};
