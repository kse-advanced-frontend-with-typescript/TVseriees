import type {Meta, StoryObj} from '@storybook/react';

import {SearchBar} from '../Components/SearchBar/SearchBar';

const meta : Meta<typeof  SearchBar>={
    component: SearchBar,
    title: 'SearchBar',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={};