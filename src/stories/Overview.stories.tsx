import type {Meta, StoryObj} from '@storybook/react';

import {Overview} from '../Components/Overview/Overview';

const meta : Meta<typeof  Overview>={
    component: Overview,
    title: 'Overview',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args: {
       overview: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.'
    }
};