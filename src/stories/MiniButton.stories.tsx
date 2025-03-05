import type {Meta, StoryObj} from '@storybook/react';
import search from '../../images/search.png';
import arrow from '../../images/down-arrow.png';

import {MiniButton} from '../MiniButton/MiniButton';

const meta : Meta<typeof  MiniButton>={
    component: MiniButton,
    title: 'MiniButton',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Search: Story ={
    args: {
        imagePath: search
    }
};
export const Arrow: Story ={
    args: {
        imagePath: arrow
    }
};