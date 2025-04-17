import type {Meta, StoryObj} from '@storybook/react';
import {PageParentComponent} from '../Components/PageNavigator/PageNavigator';

const meta : Meta<typeof  PageParentComponent>={
    component: PageParentComponent,
    title: 'PageNavigator',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story = {
    args: {
        page: 1,
        pageCount: 10
    }
};