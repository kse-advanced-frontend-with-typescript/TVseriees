import type {Meta, StoryObj} from '@storybook/react';

import {MenuExteded} from '../Components/MenuExtended/MenuExtended';

const meta : Meta<typeof  MenuExteded>={
    component: MenuExteded,
    title: 'MenuExteded',
    tags: ['autodocs']

};

export default meta;
type Story = StoryObj<typeof meta>
export const Primary: Story ={
    args: {
        links: [
            'top-rated',
            'on the air in the next 7 days',
            'popular',
            'to-watch',
            'watched',
            'favorite'
        ]
    }};