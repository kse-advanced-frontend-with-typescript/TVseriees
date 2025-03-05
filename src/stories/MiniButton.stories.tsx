import type {Meta, StoryObj} from '@storybook/react';

import {SearchButton} from "../SearchButton/SearchButton";

const meta : Meta<typeof  SearchButton>={
    component: SearchButton,
    title: 'SearchButton',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={};