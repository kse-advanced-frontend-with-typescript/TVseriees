import type {Meta, StoryObj} from '@storybook/react';
import {PageNavigator} from '../Components/PageNavigator/PageNavigator';
import {fn} from '@storybook/test';

const meta : Meta<typeof  PageNavigator>={
    component: PageNavigator,
    title: 'PageNavigator',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story = {
    args: {
        page: 1,
        pageCount: 10,
        onPageSelect: fn()
    }
};