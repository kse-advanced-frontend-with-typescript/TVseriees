import type {Meta, StoryObj} from '@storybook/react';

import {SearchBar} from '../Components/SearchField/SearchBar';

const meta : Meta<typeof  SearchBar>={
    component: SearchBar,
    title: 'SearchBar',

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={};